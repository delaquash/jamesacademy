import express, { Request, Response, Router, NextFunction } from "express";
import { getLoggedInUser, registerForToken, UserLogin } from "../controllers/UserControllers.js";
import { isAuthenticated } from "../middleware/auth.js";

const router: Router = express.Router();

router.post("/login",  UserLogin);
router.post("/register",  registerForToken);
router.get("/me", isAuthenticated, getLoggedInUser)
// router.put("/signup", signUpNewUser)
// router.post("/email-otp-request", sendOtpToMail)
// router.put("/email-otp-verify", verifyEmailOTP)
// router.get("/getUsersLoggedIn", isAuthenticated, getLoggedInUserData);
// router.get("/get-rides", isAuthenticated, getAllRides)

export default router;