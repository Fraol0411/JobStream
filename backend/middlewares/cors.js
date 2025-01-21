const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://10.1.12.40:5173",
  "http://10.1.12.40:3000",
  "http://10.1.12.40:8080",
];

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};
export default corsMiddleware;
