import express from "express";
export const testRouter = express.Router();
import { requireAuth } from "../auth/middlewire.js";
import { Test } from "./model.js";



const TestDb = async (req, res, next) => {
    console.log( "test get" )
    try {
        const data = await Test.find({});
        res.status(200).json({ data });
    } catch (err) {
        console.dir(err)
        res.status(400).json({ err });
    }
}

const TestGet = async ( req, res, next ) => {
    
        
    res.status(200).json({ message: "success" });
    
}


const TestAuth = async (req, res, next) => {
    console.log("test auth")
    try {
        const data = await Test.find({});
        res.status(200).json({ data });
    } catch (err) {
        console.dir(err)
        res.status(400).json({ error: err.message });
    }
}








testRouter.get("/", TestGet);
testRouter.get("/db", TestDb)
testRouter.get("/auth", requireAuth, TestAuth)



