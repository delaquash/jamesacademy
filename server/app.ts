import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";

import userRoutes from "./route/UserRoute.js";
import courseRoutes from "./route/CourseRoute.js";
// import { errorHandler } from "./middleware/errorHandler";
import { CustomError } from "./utils/CustomError.js";

export const app = express();
// const server = require("http").createServer(app);

app.use(express.json({ limit: "100mb" }));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/driver", driverRoutes);

// testing route
app.get("/api/v1/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Server is working!",
    });
});


const errorHandler = (
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', error);
    
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    
    return res.status(status).json({
        success: false,
        message
    });
};



// app.use(errorHandler)


