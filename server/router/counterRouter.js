const Router = require("express");
const router = new Router();
const controller = require("../controllers/counter/counter.js");
const authenticate = require("../middlewares/authenticate.js");

router.get("/current", authenticate, controller.getCurrent);
router.post("/change", authenticate, controller.postValue);

module.exports = router;
