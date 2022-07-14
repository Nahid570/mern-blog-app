const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // find the user by ID
        const user = await User.findById(decode?.id).select("-password");
        // Attach the user to the request object
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized or token expire, Login again!");
    }
  } else {
    throw new Error("There is no token attached to the header");
  }
});

module.exports = authMiddleware;
