import http from "k6/http";

import { check, sleep } from "k6";

export const options = {
  vus: 100,

  duration: "2m",

  thresholds: {
    http_req_failed: ["rate<0.01"],

    http_req_duration: ["p(95)<200"]
  }
};

const BASE_URL =
  "http://localhost:5000";

function randomUrl() {
  return `https://example.com/${Math.random()
    .toString(36)
    .substring(2, 15)}`;
}

export default function () {
  const payload = JSON.stringify({
    url: randomUrl(),

    strategy:
      Math.random() > 0.5
        ? "hash"
        : "snowflake"
  });

  const params = {
    headers: {
      "Content-Type":
        "application/json"
    }
  };

  // CREATE SHORT URL
  const shortenResponse =
    http.post(
      `${BASE_URL}/api/shorten`,
      payload,
      params
    );

  const shortenSuccess = check(
    shortenResponse,
    {
      "shorten success":
        (r) => r.status === 201
    }
  );

  // IMPORTANT FIX
  if (!shortenSuccess) {
    console.log(
      "Shorten failed:",
      shortenResponse.status,
      shortenResponse.body
    );

    return;
  }

  let body;

  try {
    body =
      shortenResponse.json();
  } catch (err) {
    console.log(
      "JSON Parse Error:",
      shortenResponse.body
    );

    return;
  }

  const shortCode =
    body.short_code;

  sleep(1);

  // REDIRECT TEST
  const redirectResponse =
    http.get(
      `${BASE_URL}/${shortCode}`,
      {
        redirects: 0
      }
    );

  check(redirectResponse, {
    "redirect success":
      (r) => r.status === 302,

    "cache header exists":
      (r) =>
        r.headers[
          "X-Cache-Status"
        ] !== undefined
  });

  sleep(1);

  // ANALYTICS TEST
  const analyticsResponse =
    http.get(
      `${BASE_URL}/api/analytics/${shortCode}`
    );

  check(analyticsResponse, {
    "analytics success":
      (r) => r.status === 200
  });

  sleep(1);
}