const UserModel = require("../../collections/users/users.js");
const RoleModel = require("../../collections/users/roles.js");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

class authController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error by registration", errors });
      }
      const { username, password } = req.body;
      const candidate = await UserModel.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User has been already registered, try login" });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await RoleModel.findOne({ value: "USER" });
      if (!userRole) {
        return res.status(400).json({ message: "DB role signing problem" });
      }
      const user = new UserModel({
        username,
        password: hashPassword,
        role: userRole.value,
      });
      user.save();
      return res.status(201).json({ message: "Registration completed", user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User wasn't registered" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = generateAccessToken(user._id, user.role);
      const update = await UserModel.findByIdAndUpdate(
        user._id,
        { token },
        { new: true }
      );
      res
        .status(200)
        .json({ token, message: `User ${username} received jwt token` });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req, res) {
    try {
      const userRole = new RoleModel();
      const adminRole = new RoleModel({ value: "ADMIN" });
      await userRole.save();
      await adminRole.save();

      res.json("server works");
    } catch (error) {}
  }
}

module.exports = new authController();
