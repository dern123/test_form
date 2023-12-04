const jwt = require("jsonwebtoken");
const config = require("config")
const jwtSecret = config.get('JWR_TOKEN');
const handler = require('../utils/responseHandler');
const { logger } = require("../helpers/logger.helper");


module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer "TOKEN"
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    logger.error(e, "Decoded JWT ERROR!", {stack:"DECODEDJWT"})
    // res.status(401).json({ message: "Something is wrong. Try again!!!" });
      return handler.negativeResponse(res, "Something is wrong. Try again!!!")
  }
};