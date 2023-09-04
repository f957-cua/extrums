const Router = require("express");
const router = new Router();
const controller = require("../controllers/auth/auth.js");
const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("username", "Enter username").notEmpty(),
    check("password", "Should be more 4 and less than 10 symbols").isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.register
);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);

module.exports = router;
