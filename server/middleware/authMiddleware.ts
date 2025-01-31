const admin = require("../config/firebase").auth;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decodedToken = await admin.verifyIdToken(token);
    req.user = decodedToken; // Attach user info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;