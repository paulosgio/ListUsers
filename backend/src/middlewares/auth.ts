import { AuthenticatedRequestDTO } from "./DTO/AuthenticatedRequestDTO";
import { NextFunction, Response } from 'express';
import jwt from "jsonwebtoken";


export const authMiddleware = (req: AuthenticatedRequestDTO, res: Response, next: NextFunction)=> {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token not provided" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }

        req.user = {
            id: decoded.id
        }

        return next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}
