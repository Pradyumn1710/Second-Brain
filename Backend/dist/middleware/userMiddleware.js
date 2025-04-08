"use strict";
// import  express  from "express";
// import jwt from 'jsonwebtoken'
// import { isMinusToken } from "typescript";
// export const userAuthMiddleware = (req:Request , res :Response)=>{
//     try {
//         const token = req.cookies?.token;
//         if(!token){
//             return res.status(401).json({ message: "Unauthorized: No token provided" });
//         }
//         const secretKey = process.env.JWT_PASSWORD;
//         if(!secretKey)
//         {
//             throw new Error("JWT key is not defined")
//         }
//         const decode = jwt.verify(token,secretKey)
//         req.userId = decode
//         next();
//     } catch (error) {
//         console.error("Error verifying token:",error);
//         return res.status(401).json({err:"Unauthorized access"})
//     }
// }
