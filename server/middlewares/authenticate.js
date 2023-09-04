const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const UserModel = require("../collections/users/users.js");

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      return res.status(400).json({ message: "Not authorized" });
    }

    const verify = jwt.verify(token, SECRET_KEY);
    if (!verify) {
      return res.status(400).json({ message: "Expired token" });
    }

    const user = await UserModel.findOne({ token });
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "DB error by finding token" });
  }
};

module.exports = authenticate;
