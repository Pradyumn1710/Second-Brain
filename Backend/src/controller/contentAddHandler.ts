import  express, { Response, Request, NextFunction }  from "express";
import {Content} from '../db'

export const contentAddHandler = async(req:Request,res:Response)=>{

    const link = req.body.link 
    const type = req.body.type
    const title = req.body.title

    try {
        const contentEntry = await Content.create({
            link,
            type,
            title,
            //@ts-ignore
            userId:req.userId,
            tags:[]
    
        })
    } catch (error) {
        console.log("There is error creating entry in the Database :",error);
        return;
    }
    res.status(200).json("Content is added in the database")
    return;

}

export const contentShowHandler = async(req:Request,res:Response)=>{
    //@ts-ignore
    const userId = req.userId;

    try {
        const content = await Content.find({
            userId:userId
        }).populate('userId','username')
        console.log(content);
        
        res.status(200).json({
            content
        })
        return
    } catch (error) {
        console.log("There is an error gathering content from db");
        return
        
    }
}