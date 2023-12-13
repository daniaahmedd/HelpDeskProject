const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Send OTP Register
router.post("/",  authorizationMiddleware(['Admin']),userController.registerUser);

// * Verify OTP Register
router.post("/verifyOTPRegister", userController.registerUser);

// * Login
router.post("/login", userController.login);

// * Verify OTP to login
router.post("/verifyOTPLogin", userController.verifyOTPLogin);

module.exports = router;