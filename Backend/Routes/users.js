const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

// * Register Users
router.post("/api/users/",  authorizationMiddleware(['Admin']),userController.registerUser);

// * Login Users
router.post("/api/users/login", userController.login);

// * Assign Roles
router.put("/api/users/assign", authorizationMiddleware(['Admin']), userController.assignRole);

// * Update User Profiles
router.put("/api/users/profile", userController.updateProfile);

// * Reset User Passwords
router.put("/api/users/password", userController.resetPassword);


module.exports = router;