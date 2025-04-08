import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async()=>{
    try{
        const mongo_url = process.env.MONGO_URIl;
        if(!mongo_url){
            throw new Error("MONGO URL is not definded in the enviornment varibles")
        }
        await mongoose.connect(mongo_url);
    }
    catch(error){
        console.log("Error connecting to Database:"+error);
        process.exit(1);
    }
}

const userSchema = new mongoose.Schema({
    username: {type:String , required:true, unique:true},
    password: {type:String , required:true }
})

export const  User = mongoose.model('User',userSchema);
