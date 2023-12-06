const userModel = require("../Models/userModel");
const sessionModel = require("../Models/sessionModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_KEY ;
const bcrypt = require("bcrypt");

const userController = {
    registerUser: async (req, res) => {
        try {
          const { UserName, firstName, lastName, userType, email, password} = req.body;
    
          const existingUser = await userModel.findOne({ email });
          if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const newUser = new userModel({
            UserName,
            userType,
            password: hashedPassword,
            email,
            firstName,
            lastName
          });
    
          await newUser.save();
    
          res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
          console.error("Error registering user:", error);
          res.status(500).json({ message: "Server error" });
        }
    },
    login: async (req, res) => {
        try {
          const { email, password } = req.body;
    
          const user = await userModel.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: "email not found" });
          }
    
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(405).json({ message: "incorect password" });
          }
    
          const currentDateTime = new Date();
          const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes

          const token = jwt.sign(
            { user: { userId: user._id, userType: user.userType } },
            secretKey,
            {
              expiresIn: 3 * 60 * 60,
            }
          );
          let newSession = new sessionModel({
            userId: user._id,
            token,
            expiresAt: expiresAt,
          });
          await newSession.save();
          return res
            .cookie("token", token, {
              expires: expiresAt,
              withCredentials: true,
              httpOnly: false,
              SameSite:'none'
            })
            .status(200)
            .json({ message: "login successfully", user });
        } catch (error) {
          console.error("Error logging in:", error);
          res.status(500).json({ message: "Server error" });
        }
    },
    assignRole : async (req, res) => {
      try {
          const { email, userType } = req.body;
          
          if (!email) {
              return res.status(404).json({ message: "email input can't be empty" });
          }

          if (!userType) {
              return res.status(404).json({ message: "user type input can't be empty" });
          }
          
          const user = await userModel.findByIdAndUpdate(
              req.params.userid,
              { userType: req.body.userType },
              {
                new: true,
              }
          );

          return res.status(200).json({ user, msg: "User type updated successfully" });
        } catch (error) {
          console.error("Error assigning role:", error);
          res.status(500).json({ message: "Server error" });
        }
    },
    updateProfile: async (req, res) => {
      try {
          const { userid, email, password, userName} = req.body;

          if (!userid) {
              return res.status(404).json({ message: "User id input can't be empty" });
          }

          //law email bas el null update password and userName
          if (!email) { 
              var user = await userModel.findByIdAndUpdate(
                  userid,
                  { 
                      password: req.body.password,
                      userName: req.body.userName
                  },
                  {
                    new: true,
                  }
              );
          }

          //law password bas el null update email and userName
          if (!password) { 
              var user = await userModel.findByIdAndUpdate(
                  userid,
                  { 
                      email: req.body.email,
                      userName: req.body.userName
                  },
                  {
                    new: true,
                  }
              );
          }

          //law userName bas el null update email and password
          if (!userName) { 
              var user = await userModel.findByIdAndUpdate(
                  userid,
                  { 
                      email: req.body.email,
                      password: req.body.password
                  },
                  {
                    new: true,
                  }
              );
          }
          
          //if none are null; update all of them
          //frontend button yedy option to update all at once
          var user = await userModel.findByIdAndUpdate(
            userid,
            { 
                email: req.body.email,
                password: req.body.password,
                userName: req.body.userName
            },
            {
              new: true,
            }
          );

          return res.status(200).json({ user, msg: "User info updated successfully" });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
    resetPassword: async (req, res) => {
      try {
      
      
        return res.status(200).json({ user, msg: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    }
};
module.exports = userController;