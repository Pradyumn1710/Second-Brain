import mongoose, { Mongoose } from "mongoose";
import {essential} from './config'
export const connectDB = async()=>{
    try{
        const mongo_url = essential.MONGODB_URL;
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

const contentTypes = ['image','video','article','audio']

const contentSchema = new mongoose.Schema({
    link:{type:String , required :true},
    type :{type:String , enum:contentTypes, required:true},
    title:{type:String , required:true},
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true}


})

const userSchema = new mongoose.Schema({
    username: {type:String , required:true, unique:true},
    password: {type:String , required:true }
})

export const  User = mongoose.model('User',userSchema);
export const  Content = mongoose.model('Content',contentSchema);
