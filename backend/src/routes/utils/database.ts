import express from 'express'
import mongoose, { mongo }  from 'mongoose'
import { Schema } from 'zod'

mongoose.connect("",
   { useNewUrlParser : true ,useUnifiedTopology :true}
).then(()=>{
    console.log("Conneted to DB");
    
}).catch((error :Error)=>{
    console.log("Error connecting to db :",error);
    
})

const userSchema = new mongoose.Schema({
    username :{ type:String ,required : true },
    firstName : {type:String,required : true},
    lastName : {type:String, required :true},
    password :{type:String, required :true}
})

export const User = mongoose.model('User',userSchema)