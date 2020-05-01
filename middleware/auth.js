const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  let token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token Required",
    });
  }
  try {
    let decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: "Invalid token",
    });
  }
};
