# Distributed URL Shortener — Enhanced by Ainul Haq

**Maintained and enhanced by Ainul Haq (2026).**

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for Windows VS Code, GitHub, and online deployment instructions. See [AUTHOR.md](AUTHOR.md) for copyright and attribution details.

---

# Distributed URL Shortener

A production-grade distributed URL shortener inspired by Bitly and TinyURL.

This project demonstrates:
- Distributed system design
- Collision-resistant ID generation
- Redis read-through caching
- Redis Streams analytics pipeline
- Background worker processing
- Real-time analytics dashboard
- Dockerized microservices architecture
- High-throughput benchmarking

---

# Architecture Overview

## Components

### API Service
Responsible for:
- URL shortening
- Redirect handling
- Redis cache integration
- Publishing analytics events

### PostgreSQL
Persistent source of truth for:
- URL mappings
- Aggregated analytics

### Redis
Used for:
- Read-through cache
- Redis Streams event queue

### Analytics Worker
Consumes Redis Stream events asynchronously and aggregates analytics.

### Frontend
React + Vite dashboard for:
- Creating short URLs
- Viewing analytics charts

---

# System Architecture

```text
                ┌─────────────────┐
                │   React Client  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   API Service   │
                └────────┬────────┘
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
 ┌──────────────┐               ┌────────────────┐
 │ Redis Cache  │               │ PostgreSQL DB  │
 └──────────────┘               └────────────────┘
         │
         ▼
 ┌────────────────┐
 │ Redis Streams  │
 └────────┬───────┘
          ▼
 ┌────────────────┐
 │ Worker Service │
 └────────────────┘
```

---

# Distributed Systems Concepts

## Why Auto Increment Fails

Auto-increment IDs create:
- Centralized bottlenecks
- Lock contention
- Single points of failure
- Poor horizontal scalability

This project avoids those issues using:
- Hash-based IDs
- Snowflake-inspired distributed IDs

---

# Snowflake ID Strategy

Structure:

```text
(timestamp << 22) | (node_id << 12) | sequence
```

Advantages:
- Distributed-safe
- Collision resistant
- Time sortable
- No centralized coordinator

---

# Hash Strategy

Uses:
- SHA256 hashing
- Base62 encoding
- Collision retry handling

Advantages:
- Deterministic
- Simple
- Compact short codes

---

# Redis Read-Through Cache

Redirect flow:

1. Request arrives
2. Redis checked first
3. Cache HIT:
   - redirect immediately
4. Cache MISS:
   - fetch from PostgreSQL
   - populate Redis
   - redirect

Response headers:

```text
X-Cache-Status: HIT
```

or

```text
X-Cache-Status: MISS
```

---

# Redis Streams Analytics Pipeline

Analytics are asynchronous.

Redirect requests publish click events into Redis Streams.

Worker service:
- consumes events
- batches processing
- aggregates hourly clicks
- updates PostgreSQL

This keeps redirects ultra-fast.

---

# Project Structure

```text
distributed-url-shortener/
├── api/
├── worker/
├── frontend/
├── db/
├── load-test/
├── docker-compose.yml
├── README.md
└── BENCHMARK.md
```

---

# Setup Instructions

## 1. Install Docker

Install Docker Desktop.

Verify:

```bash
docker --version
docker compose version
```

---

# Clone Project

```bash
git clone <your-repo-url>

cd distributed-url-shortener
```

---

# Environment Variables

Create `.env` in root:

```env
POSTGRES_DB=url_shortener

POSTGRES_USER=postgres

POSTGRES_PASSWORD=postgres

DATABASE_URL=postgresql://postgres:postgres@postgres:5432/url_shortener

REDIS_URL=redis://redis:6379

API_PORT=5000

NODE_ID=1

BASE_URL=http://localhost:5000

CACHE_TTL=86400

REDIS_STREAM_NAME=click_events

REDIS_CONSUMER_GROUP=analytics-group
```

---

# Run Entire System

```bash
docker compose up --build
```

---

# Verify Running Containers

```bash
docker ps
```

Expected containers:
- postgres
- redis
- api
- worker

---

# Frontend

Open:

```text
http://localhost:3000
```

---

# API Endpoints

## Health Check

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

# Create Short URL

```http
POST /api/shorten
```

Request:

```json
{
  "url": "https://google.com",
  "strategy": "snowflake"
}
```

Response:

```json
{
  "success": true,
  "short_url": "http://localhost:5000/abc123",
  "short_code": "abc123",
  "strategy": "snowflake"
}
```

---

# Redirect

```http
GET /abc123
```

Returns:
- 302 redirect
- cache headers

---

# Analytics

```http
GET /api/analytics/abc123
```

Response:

```json
{
  "total_clicks": 100,
  "history": [
    {
      "hour_bucket": "2026-05-16T10:00:00Z",
      "clicks": 25
    }
  ]
}
```

---

# Benchmarking

Install k6.

macOS:

```bash
brew install k6
```

Ubuntu:

```bash
sudo apt install k6
```

Run:

```bash
k6 run load-test/k6-script.js
```

---

# Scaling Discussion

## Horizontal Scaling

API service can scale horizontally because:
- stateless architecture
- distributed IDs
- Redis shared cache
- PostgreSQL pooling

---

# Future Improvements

Potential production enhancements:
- Kubernetes deployment
- Kafka instead of Redis Streams
- CDN integration
- Geo-replication
- Multi-region support
- Advanced analytics
- URL expiration cleanup jobs

---

# Troubleshooting

## Docker Build Errors

Rebuild:

```bash
docker compose up --build
```

---

# Remove Containers

```bash
docker compose down -v
```

---

# View Logs

```bash
docker compose logs -f
```

---

# Screenshots

Add screenshots here:
- Frontend UI
- Docker containers
- Benchmark output
- Analytics charts

---

# License

MIT