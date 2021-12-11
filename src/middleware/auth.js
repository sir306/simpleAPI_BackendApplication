import userSchema from "../models/userModel.js";
import mongoose from "mongoose";
const User = mongoose.model("User", userSchema);

export const auth = (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.status(401).json({ message: "You are not logged in!" });

    req.token = token;
    req.user = user;

    next();
  });
};
