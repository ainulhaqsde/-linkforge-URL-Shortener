import {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

import api from "../api";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import AnalyticsChart from "../components/AnalyticsChart";

function Analytics() {
  const { shortCode } =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [data, setData] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const response =
        await api.get(
          `/api/analytics/${shortCode}`
        );

      setData(response.data);
    } catch (err) {
      setError(
        "Failed to fetch analytics"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>
          Analytics for {shortCode}
        </h2>

        <p>
          Total Clicks:{" "}
          {data.total_clicks}
        </p>
      </div>

      <AnalyticsChart
        history={data.history}
      />
    </div>
  );
}

export default Analytics;