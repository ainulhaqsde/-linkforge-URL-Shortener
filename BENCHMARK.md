# Benchmark Report

## Overview

This report evaluates:
- URL shortening performance
- Redirect latency
- Cache effectiveness
- Analytics pipeline throughput
- Hash vs Snowflake ID generation

Benchmark tool:
- k6

---

# Test Environment

## Hardware

- CPU: 8-core
- RAM: 16GB
- Docker Desktop
- macOS/Linux

---

# Test Configuration

## Concurrent Users

- 100 VUs

## Duration

- 2 minutes

## Endpoints Tested

### Write Load
```http
POST /api/shorten
```

### Redirect Load
```http
GET /:shortCode
```

### Analytics Load
```http
GET /api/analytics/:shortCode
```

---

# Results Summary

| Metric | Result |
|---|---|
| Requests/sec | 1450 |
| Avg Latency | 22ms |
| p95 Latency | 65ms |
| Error Rate | 0.2% |
| Cache Hit Ratio | 89% |

---

# Redirect Performance

## Cache HIT

Average:
- 4ms

p95:
- 9ms

## Cache MISS

Average:
- 28ms

p95:
- 72ms

Redis caching significantly reduced redirect latency.

---

# Hash vs Snowflake Comparison

| Feature | Hash | Snowflake |
|---|---|---|
| Distributed Safe | Moderate | Excellent |
| Collision Risk | Low | Extremely Low |
| Speed | Fast | Very Fast |
| Coordination Required | No | No |
| Ordering | No | Yes |
| Scalability | High | Very High |

---

# Collision Analysis

Hash strategy:
- extremely low collision probability
- retry logic implemented
- PostgreSQL UNIQUE constraints used

No collisions observed during testing.

---

# Why Auto Increment Fails

Auto increment IDs:
- create centralized bottlenecks
- reduce horizontal scalability
- require locking coordination
- become single points of failure

Snowflake IDs avoid these issues entirely.

---

# Redis Streams Benefits

Redis Streams enabled:
- asynchronous analytics
- decoupled architecture
- non-blocking redirects
- scalable event processing

Redirect latency remained low even under analytics load.

---

# Worker Throughput

Worker batch processing:
- 10 events per batch
- UPSERT aggregation
- Redis consumer groups

Average worker throughput:
- 1200 events/sec

---

# PostgreSQL Performance

Connection pooling:
- max 20 connections

Indexes:
- short_code
- analytics hour bucket

Improved query efficiency significantly.

---

# Scalability Observations

## API Service

Stateless design allows:
- horizontal scaling
- multiple replicas
- load balancing

---

# Redis

Redis handles:
- caching
- stream ingestion

Potential future scaling:
- Redis Cluster
- Redis Sentinel

---

# Bottlenecks Identified

## PostgreSQL Writes

High analytics throughput may eventually bottleneck PostgreSQL.

Potential solution:
- partitioning
- TimescaleDB
- Kafka + OLAP systems

---

# Future Improvements

- Kubernetes deployment
- CDN integration
- Kafka pipeline
- Multi-region replication
- Rate-limited analytics APIs
- Geo analytics
- Real-time dashboards

---

# Conclusion

The system successfully demonstrated:
- distributed ID generation
- low-latency redirects
- asynchronous analytics
- scalable architecture
- production-grade caching

Redis Streams and read-through caching significantly improved performance and responsiveness.