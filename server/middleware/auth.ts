import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { NextFunction, Request, Response } from "express";
declare module "express" {
  interface Request {
    user: any;
    JWTPayload: any;
  }
}

interface JWTPayload {
    id: string;
    // Add other fields that your token contains
    email?: string;
    role?: string;
}

export const isAuthenticated = async (req: Request, res:Response, next: NextFunction) => {
  try {
    const accessToken = req.headers["authorization"];

    if (accessToken && accessToken.startsWith("Bearer ")) {
      const token = accessToken.slice(7, accessToken.length);

      // verify the token
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!);

      // fetching user data
      const user = await prisma.user.findUnique({
        where: {
          id: userData.id,
        },
        include: {
          orders: true,
          reviews: true,
          Tickets: true,
        },
      });

      // Attach the user data to the request object
      req.user = user;

      next();
    } else {
      res.status(401).json({
        success: false,
        message: "Authentication token is missing or invalid.",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};