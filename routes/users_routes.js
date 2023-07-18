const express = require("express");
const { userRegister, loginUser, currentUser } = require("../controllers/user_controller");
const validateToken = require("../middleware/validationTokenHandler");
const router = express.Router();


router.post("/register", userRegister);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;