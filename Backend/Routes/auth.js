const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Verify OTP Register
router.post("/verifyOTPRegister", userController.verifyOTPRegister);

// * Login
router.post("/login", userController.login);

// * Verify OTP to login
router.post("/verifyOTPLogin", userController.verifyOTPLogin);

module.exports = router;