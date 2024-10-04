const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddlewares = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Unauthorized HTTP , Token not provided" });
  }
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token Is : ", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddlewares;