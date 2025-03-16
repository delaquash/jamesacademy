require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { sendToken } from "../utils/sendToken";

export const UserLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { signedToken} = req.body;
        const data = jwt.verify(signedToken, process.env.JWT_SECRET!) as jwt.JwtPayload;
        console.log(process.env.JWT_SECRET)
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