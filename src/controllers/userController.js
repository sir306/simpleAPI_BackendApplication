import mongoose from "mongoose";
import userSchema from "../models/userModel.js";

const User = mongoose.model("User", userSchema);

export const registerUser = (req, res) => {
  const newUser = new User(req.body);

  User.findOne({ email: newUser.email }, (err, user) => {
    if (user) {
      res.status(400).json({ auth: false, message: "email already exists" });
    }

    newUser.save((err, doc) => {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false });
      }
      res.status(200).json({
        success: true,
        user: doc,
      });
    });
  });
};

export const loginUser = (req, res) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) {
      res.status(400).send(err);
    }
    // check to see if user is logged in
    if (user) {
      res.status(400).json({
        error: true,
        message: "You are already logged in!",
      });
    } else {
      // check email
      User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
          res.json({ isAuth: false, message: "Auth failed, email not found" });
        }
        // check password
        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch) {
            res.json({ isAuth: false, message: "Passord is incorrect" });
          }
        });
        // token generate
        user.generateToken((err, user) => {
          if (err) {
            res.status(400).send(err);
          }
          res.cookie("auth", user.token).json({
            isAuth: true,
            id: user._id,
            email: user.email,
          });
        });
      });
    }
  });
};

// this endpoint will return a logged in users profile
export const getUserProfile = (req, res) => {
  res.status(200).json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
  });
};

export const logoutUser = (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) {
      res.status(400).send(err);
    }
    res.sendStatus(200);
  });
};
