import express, { Request, Response, Router, NextFunction } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getCourses } from "../controllers/CourseController.js";

const router: Router = express.Router();

router.post("/get-courses",  getCourses);

export default router;