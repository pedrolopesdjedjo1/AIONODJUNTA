const buckets = new Map();

function rateLimit({
  windowMs = 15 * 60 * 1000,
  max = 100
} = {}) {
  return (req, res, next) => {
    const key = req.ip || "unknown";
    const now = Date.now();

    let bucket = buckets.get(key);

    if (!bucket || now - bucket.start >= windowMs) {
      bucket = {
        start: now,
        count: 0
      };
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    res.setHeader("RateLimit-Limit", max);
    res.setHeader(
      "RateLimit-Remaining",
      Math.max(0, max - bucket.count)
    );

    if (bucket.count > max) {
      return res.status(429).json({
        success: false,
        message: "Demasiados pedidos. Tenta novamente mais tarde."
      });
    }

    next();
  };
}

module.exports = rateLimit;
