"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userAuthMiddleware = (req, res, next) => {
    var _a, _b;
    try {
        let token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        // Check for token in headers if not found in cookies
        if (!token && req.headers.token) {
            token = req.headers.token;
        }
        // Check for token in Authorization header (Bearer token)
        if (!token && ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.startsWith("Bearer "))) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return;
        }
        const secretKey = config_1.essential.JWT_PASSWORD;
        if (!secretKey) {
            throw new Error("JWT key is not defined");
        }
        console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log(decoded);
        // Assuming the token contains a `userId` field
        if (typeof decoded === "object" && "userId" in decoded) {
            //@ts-ignore
            req.userId = decoded.userId;
        }
        else {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ err: "Unauthorized access" });
    }
};
exports.userAuthMiddleware = userAuthMiddleware;
