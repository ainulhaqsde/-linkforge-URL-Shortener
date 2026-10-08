# Enhanced Distributed URL Shortener

## Added
- Custom aliases (3–20 characters), unique constraint conflict returns HTTP 409
- Optional future expiration with DB-side filtering
- HTTP(S)-only URL validation and rejection of credential-bearing URLs
- More responsive link-creation UI, loading feedback, copy feedback
- QR preview (external service; avoid sensitive URLs)
- Configurable frontend API base URL (`VITE_API_URL`)
- Node built-in unit tests for URL validation

## Run
1. Install Docker Desktop and Node.js.
2. Copy `.env.example` to `.env`, configure variables as described in README.
3. Run `docker compose up --build` from project root.
4. Visit the frontend URL shown in the README.
5. Run `cd api && npm install && npm test` for validation tests.

## Production backlog
- Protect against abusive destinations and phishing; introduce account-level quotas and moderation.
- Use an internal QR renderer to avoid disclosing URLs to a third party.
- Redis expiry-aware cache entries for every type of link; currently expiring links are intentionally not cached.
- Multi-instance collision retries and Snowflake worker ID coordination.
- Authentication, ownership, analytics access control, custom domains, CI and integration tests.
- Configure strict CORS, trusted proxy handling, and a proper public BASE_URL before deployment.
