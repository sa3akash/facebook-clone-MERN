const jwt = require("jsonwebtoken");
const { createError } = require("./ErrorHandler");

exports.authUser = (req, res, next) => {
  const token = req.header("authorization")?.split(" ")[1];
  if (!token) return next(createError(400, "Authentication failed."));

  jwt.verify(token, process.env.JWT_GEN, (err, user) => {
    if (err) return next(createError(400, "Authentication failed."));
    req.user = user;
    next();
  });
};
