import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotpasswordController,
  editProfileController,
  updatePhoneController, 
  UpdateBudgetController,
  forgotPassword,
  resetPassword
  // Add the new controller import
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot PAssword ||post
router.post("/forgotpassword", forgotpasswordController);
router.post("/password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Edit Profile || POST
router.post("/editprofile", requireSignIn, editProfileController);
router.post("/edit-phone", requireSignIn,updatePhoneController);
router.post("/budget",requireSignIn,UpdateBudgetController)
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  const { user } = req.body;
  console.log(user);
  res.status(200).json({ status: "ok", user });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  const { user } = req.body;
  res.status(200).json({ status: "ok", user });
});

export default router;
