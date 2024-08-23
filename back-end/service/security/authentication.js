const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;

const tokenVerification = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["x-access-token"] || req?.signedCookies?.user?.token;
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "Token is not provided.",
      status: 403
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log("Failed to authenticate token.");
    return res.status(401).send({
      auth: false,
      message: "Failed to authenticate token.",
      status: 401
    });
  }
  return next();
};
// middleware/authentication.js

const jwt = require('jsonwebtoken');  // Assuming you're using JWT for authentication

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  // Replace with your secret
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;  // Attach user information to the request
        next();
    });
};

module.exports = tokenVerification;