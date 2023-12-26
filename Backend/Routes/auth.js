const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// * Verify OTP Register
router.post("/verifyOTPRegister", userController.verifyOTPRegister);

// * Login
router.post("/login", userController.login);

// * Verify OTP to login
router.post("/verifyOTPLogin", userController.verifyOTPLogin);

module.exports = router;