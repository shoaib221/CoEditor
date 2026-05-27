
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import * as Y from "yjs";
import admin from "firebase-admin";



export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


export const server = http.createServer(app);


export const wss = new WebSocketServer({
    server,
});

function firebaseConfigRun() {

    try {
        // console.log(process.env.FIREBASE_KEY, '\n');
        let key = Buffer.from(process.env.FIREBASE_KEY, "base64").toString("utf8");
        // console.log(key, '\n');
        let key1 = JSON.parse(key);
        // console.log( key1, '\n' )

        admin.initializeApp({
            credential: admin.credential.cert(key1)
        });
    } catch (err) {
        console.dir(err)
    }
}

firebaseConfigRun();

export const firebaseAdmin = admin;