import express from 'express';
import { loginHandler , signupHandler } from '../controller/authentication';
import dotenv from 'dotenv';
dotenv.config();

export const userRouter = express.Router();


userRouter.post('/signup', signupHandler);
userRouter.post('/login', loginHandler);

