require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

export const UserLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { signedToken} = req.body;
        const data = jwt.verify(signedToken, process.env.JWT_SECRET!) as jwt.JwtPayload;
        if(data) {
            const isUserExist = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
            })
        }
    } catch (error) {
        
    }
}