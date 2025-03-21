import dotenv from "dotenv";
dotenv.config()
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { sendToken } from "../utils/sendToken.js";


console.log("JWT_SECRET:", process.env.JWT_SECRET);


export const UserLogin = async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
    try {
        console.log("Request Body:", req.body);
        const { signedToken} = req.body;
        if (!signedToken) {
           res.status(400).json({ success: false, message: "JWT must be provided..." });
       }
        const data = jwt.verify(signedToken, process.env.JWT_SECRET!) as jwt.JwtPayload;
       
        console.log("Data:", data);
        
        console.log("Signed Token:", req.body.signedToken);

        if(data) {
            const isUserExist = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
            })
            if(isUserExist) {
                await sendToken(isUserExist, res)
            } else {
                const user = await prisma.user.create({
                    data: {
                        email: data.email,
                        name: data.name,
                        avatar: data.avatar
                    }
                })
                await sendToken(user, res)
            }
        } else {
            res.status(404).json({ 
                success: false,
                message: "Your request is not authorized" })
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }
}