import express from "express";
import { UserLogin } from "../controllers/UserControllers.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", isAuthenticated, UserLogin);
// router.post("/verifyOtp", verifyOtp);
// router.put("/signup", signUpNewUser)
// router.post("/email-otp-request", sendOtpToMail)
// router.put("/email-otp-verify", verifyEmailOTP)
// router.get("/getUsersLoggedIn", isAuthenticated, getLoggedInUserData);
// router.get("/get-rides", isAuthenticated, getAllRides)

export default router;