# VS Code → GitHub → Online Deployment

Maintained and enhanced by **Ainul Haq**. See AUTHOR.md for attribution details.

## Local setup (Windows PowerShell)
1. Install Git, Docker Desktop, VS Code. Start Docker Desktop.
2. Open this folder (the one containing docker-compose.yml) in VS Code.
3. Run `Copy-Item .env.example .env` and change POSTGRES_PASSWORD to a strong local password. Update DATABASE_URL with the same password (URL-encode special characters if needed).
4. Run `docker compose up --build -d` and `docker compose ps`.
5. Visit http://localhost:3000 and verify the API at http://localhost:5000/api/health (route availability depends on API mounting).
6. View logs using `docker compose logs -f api worker frontend`. Stop using `docker compose down` (avoid `-v` unless you intend to erase local DB data).

## GitHub
1. Create a new empty public GitHub repository `distributed-url-shortener`.
2. Ensure `.env` is NOT tracked: `git status --short`.
3. Run:
   `git init`
   `git add .`
   `git commit -m "Project enhancements by Ainul Haq"`
   `git branch -M main`
   `git remote add origin https://github.com/YOUR_USERNAME/distributed-url-shortener.git`
   `git push -u origin main`
4. Preserve original authorship and licensing obligations.

## Online deployment overview
This application has five services: React frontend, Express API, analytics worker, PostgreSQL, Redis. A static-only frontend deployment will NOT make it functional.

A practical route is a cloud VPS with Docker Compose and an HTTPS reverse proxy, or a container platform supporting background workers, PostgreSQL and Redis.

Production work before exposing it publicly:
- Set a strong PostgreSQL password and production-only secrets.
- Use HTTPS, proper domains, CORS configuration, reverse proxy and BASE_URL matching the public redirect domain.
- Avoid exposing PostgreSQL (5432) and Redis (6379) to the internet: remove host port mappings.
- Configure frontend VITE_API_URL at build time for your public API domain (Vite embeds it in built assets).
- Add backups, abuse protection, observability and a secure deployment pipeline.
- Verify routing, analytics worker, and rate limits in staging before announcing production readiness.

## Copyright
A name or copyright notice is not an official registration. Copyright generally protects original creative expression automatically in many jurisdictions, but does not grant ownership of someone else's original code. Check provenance and licensing before claiming exclusive rights or adding a repository-wide license.
