const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Register Users
router.post("/api/users/",  authorizationMiddleware(['Admin']),userController.registerUser);

// * Verify Users
router.post("/api/users/login", userController.login);

// * Login Users
router.post("/api/users/login", userController.login);

// * Assign Roles
router.put("/api/users/assign", authorizationMiddleware(['Admin']), userController.assignRole);

// * Update User Profiles
router.put("/api/users/profile", userController.updateProfile);

// * Forgot User Passwords
router.put("/api/users/password", userController.forgotPassword);

// * Reset User Passwords
router.put("/api/users/change/password", userController.resetPassword);


module.exports = router;