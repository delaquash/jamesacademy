import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


import { Response } from "express";
export const sendToken= async(user: any, res: Response) => {
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_ACCESS_TOKEN_SECRET!
    );
    res.status(201).json({
        success: true,
        accessToken
    })
}