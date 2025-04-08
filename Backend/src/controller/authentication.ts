import express from 'express';
import type { Request, Response, RequestHandler } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {essential} from '../config'
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
import {User} from '../db'



const loginSchema = z.object({
    username:z.string().email("Invalid Email Address").min(3,"Minimum length should be 3 character"),
    password:z.string().min(6,'Minimum length should be 3 character')
})

const signupSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters long')
        .email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters long')
});

export const loginHandler:RequestHandler = async(req:Request, res:Response) =>{
    const loginDetails = loginSchema.safeParse(req.body);

    if(!loginDetails.success){
        res.status(400).json({
            error:"Error parsing details",
            details:loginDetails.error.errors,
        })
        return;
    }

    const {username , password} = loginDetails.data;

    // searching through the db with the help of models here 
    try{
            const user = await User.findOne({username});
            if(!user){
                res.status(401).json({
                    msg:"Invalid details"
                })
                return;
            }

            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(400).json({
                    error:"Invalid Password"
                })
                return
            }

            const jwtSecret = process.env.JWT_PASSWORD

            if(!jwtSecret){
                throw new Error("There is an error")
            }
            const token = jwt.sign({username:user.username},jwtSecret,
                { expiresIn: '1h' })

                 res.status(200).json({
                    message: 'Login successful',
                    user: { username: user.username }
                });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}



export const signupHandler: RequestHandler = async (req: Request, res: Response) => {
    const userDetails = signupSchema.safeParse(req.body);

    if (!userDetails.success) {
        res.status(400).json({
            error: 'Validation failed',
            details: userDetails.error.errors,
        });
        return;
    }

    const { username, password } = userDetails.data;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user to database (placeholder)
        const alreadyPresent = await User.findOne({username})

        if(alreadyPresent) {
             res.status(401).json({
                error:"User Already Exhist"
            })
            return
        }
        
        const newUser = await User.create({ username, password: hashedPassword });


        const jwtSecret = essential.JWT_PASSWORD
        if (!jwtSecret) throw new Error("JWT_SECRET not defined");

        const token = jwt.sign(
            { username: newUser.username },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });

        res.status(201).json({
            message: "User created successfully",
            user: { username: newUser.username }
        });
    } catch (error) {
        console.error(error , "There is an issue with signup")
        }
    
        
    }
