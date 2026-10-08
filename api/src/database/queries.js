export const queries = {
  insertUrl: `INSERT INTO urls (short_code, original_url, strategy, expires_at) VALUES ($1,$2,$3,$4) RETURNING *`,
  getUrl: `SELECT * FROM urls WHERE short_code=$1 AND (expires_at IS NULL OR expires_at > NOW())`
};
