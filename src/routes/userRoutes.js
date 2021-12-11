import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

export const UserRoutes = (app) => {
  app
    .route("/register")
    // POST new user
    .post(registerUser);

  app
    .route("/login")
    // POST login user
    .post(loginUser);

  app
    // GET user profile
    .get("/profile", auth, getUserProfile);

  app
    // GET logout user
    .get("/logout", auth, logoutUser);
};

export default UserRoutes;
