const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Assign Roles
router.put("/assign", authorizationMiddleware(['Admin']), userController.assignRole);

// * Update User Profiles
router.put("/profile", userController.updateProfile);

// * Forgot User Passwords
router.put("/password", userController.forgotPassword);

// * Reset User Passwords
router.put("/change/password", userController.resetPassword);

// * Logout
router.put("/logout", userController.logout);


module.exports = router;