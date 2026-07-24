const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ quiet: true });
const AuthMiddleWare = async (req, res, next) => {
  try {
    const AuthHeader = req.headers.authorization;
    if (!AuthHeader) {
      return res
        .status(400)
        .json({ sucess: false, message: "Authorization header missing" });
    }
    const AuthToken = AuthHeader.split(" ")[1];
    // Terminate if token is missing
    if (!AuthToken) {
      return res.status(401).json({ message: "Access token missing" });
    }
    const decode = jwt.verify(AuthToken, process.env.MYTOKEN);
    console.log(decode)
    req.users = decode;
    next();
  } catch (err) {
    // Terminate if token is invalid or expired
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
module.exports = AuthMiddleWare;
