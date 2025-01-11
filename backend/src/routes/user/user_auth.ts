import express from 'express'
import { Router , Request , Response } from 'express'
import {z} from 'zod'

export const user_auth = express.Router()

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
interface Signup extends Request{
   body:{ username : string ,
    firstname : string ,
    lastname : string ,
    password : string }
}

user_auth.post("/signup",(req : Signup ,res : Response)=>{
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
