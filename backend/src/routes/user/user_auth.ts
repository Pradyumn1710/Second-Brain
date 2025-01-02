import express from 'express'
export const user_auth = express.Router()
import {z} from 'zod'

enum StatusCodes {
    OK = 200 ,
    Created = 201 ,
    BadRequest = 400 ,
    InternalServerError = 500
}
enum Error{
    WI = "Wrong Inputs"
}

const userSchema = z.object({
    username : z.string(),
    firstName : z.string(),
    lastName : z.string(),
    password : z.string()
})

user_auth.post("/signup",(req,res)=>{
    const userDetails = userSchema.safeParse(req.body)
    if(!userDetails){
        res.status(StatusCodes.BadRequest).send(Error.WI)
    }
    else{
        try{
            

        }
        catch(error){

        }
    }
})
