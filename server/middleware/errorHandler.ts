import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError, TimeoutError } from "../utils/error";

export const errorHandler: ErrorRequestHandler=(error:Error,req: Request, res: Response, next: NextFunction)=> {
    if(error instanceof BadRequestError) {
        return res.status(error.statusCode).json({ errors: error.serializeErrors() });
    }

    if(error instanceof NotFoundError) {
        return res.status(error.statusCode).json({ errors: error.serializeErrors() });
    }

    if(error instanceof ConflictError) {
        return res.status(error.statusCode).json({ errors: error.serializeErrors() });
    }

    if(error instanceof InternalServerError) {
        return res.status(error.statusCode).json({ errors: error.serializeErrors() });
    }

    if(error instanceof TimeoutError) {
        return res.status(error.statusCode).json({ errors: error.serializeErrors() });
    }

    if(error instanceof Error) {
        res.status(500).json({ errors: error.message });
    } else {
        // For unexpected errors
        res.status(500).send({ message: "Something went wrong" });
    }
    next();
}