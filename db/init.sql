CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS urls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    short_code VARCHAR(20) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    strategy VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    click_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_urls_short_code
ON urls(short_code);

CREATE INDEX IF NOT EXISTS idx_urls_created_at
ON urls(created_at);

CREATE INDEX IF NOT EXISTS idx_urls_expires_at
ON urls(expires_at);

CREATE TABLE IF NOT EXISTS analytics_hourly (
    short_code VARCHAR(20) NOT NULL,
    hour_bucket TIMESTAMP NOT NULL,
    clicks INTEGER DEFAULT 0,
    PRIMARY KEY(short_code, hour_bucket)
);

CREATE INDEX IF NOT EXISTS idx_analytics_hour_bucket
ON analytics_hourly(hour_bucket);