import  express  from "express";
import cookieParser from 'cookie-parser';
import {userRouter} from './routes/authController'
import {connectDB} from './db'
import dotenv from 'dotenv'
dotenv.config();


connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

console.log(process.env.MONGODB_URL,process.env.JWT_PASSWORD);


app.use('/auth',userRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
