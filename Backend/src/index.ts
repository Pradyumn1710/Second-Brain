import  express  from "express";
import cookieParser from 'cookie-parser';
import {userRouter} from './routes/authController'
import {connectDB} from './db'
import dotenv from 'dotenv'
dotenv.config();
import { contentRouter } from "./routes/content";
import { userAuthMiddleware } from "./middleware/userMiddleware";


connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/auth',userRouter);
app.use("/user",contentRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
