import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { essential } from "../config";

export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        let token = req.cookies?.token;

        // Check for token in headers if not found in cookies
        if (!token && req.headers.token) {
            token = req.headers.token as string;
        }

        // Check for token in Authorization header (Bearer token)
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
             res.status(401).json({ message: "Unauthorized: No token provided" });
            return
            }

        const secretKey = essential.JWT_PASSWORD;

        if (!secretKey) {
            throw new Error("JWT key is not defined");
        }

        console.log(token);
        

        const decoded = jwt.verify(token, secretKey);

        console.log(decoded);
        

        // Assuming the token contains a `userId` field
        if (typeof decoded === "object" && "userId" in decoded) {
            //@ts-ignore
            req.userId = decoded.userId as string;
        } else {
             res.status(401).json({ message: "Invalid token payload" });
            return
            }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ err: "Unauthorized access" });
    }
};