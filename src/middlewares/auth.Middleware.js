const API_KEY = process.env.API_KEY || 'GOGOGO';


export const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      error: "Unauthorized (sin credenciales)",
    });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({
      error: "Forbidden (credenciales inválidas)",
    });
  }

  next();
};