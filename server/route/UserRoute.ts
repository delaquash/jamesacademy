import express from "express";
import { UserLogin } from "../controllers/UserControllers";

const router = express.Router();

router.post("/login", UserLogin);
// router.post("/verifyOtp", verifyOtp);
// router.put("/signup", signUpNewUser)
// router.post("/email-otp-request", sendOtpToMail)
// router.put("/email-otp-verify", verifyEmailOTP)
// router.get("/getUsersLoggedIn", isAuthenticated, getLoggedInUserData);
// router.get("/get-rides", isAuthenticated, getAllRides)

export default router;