import dotenv from "dotenv";
dotenv.config()
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { sendToken } from "../utils/sendToken.js";

export const getCourses = async(req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const courses = await prisma.course.findMany({
            include: {
                courseData: {
                    include: {
                        links: true
                    }
                },
                benefits: true,
                prerequisites: true,
            }
        })
        res.status(201).json({
            success: true,
            courses
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }
}