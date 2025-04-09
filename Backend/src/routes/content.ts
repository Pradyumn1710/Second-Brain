import  express  from "express";
import {contentAddHandler,contentShowHandler} from '../controller/contentAddHandler'
import { userAuthMiddleware } from "../middleware/userMiddleware";

export const contentRouter = express.Router();

contentRouter.post('/add',userAuthMiddleware,contentAddHandler)
contentRouter.get('/show',userAuthMiddleware,contentShowHandler)