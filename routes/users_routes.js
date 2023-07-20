const express = require("express");
const userController = require("../controllers/user_controller");
const validateToken = require("../middleware/validationTokenHandler");
const router = express.Router();


router.post("/register", userController.userRegister);

router.post("/login", userController.loginUser);

router.get("/current", validateToken, userController.currentUser);

module.exports = router;
