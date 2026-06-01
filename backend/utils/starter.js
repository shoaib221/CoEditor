
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import admin from "firebase-admin";



export const app = express();
export const server = http.createServer(app);



export const wss = new WebSocketServer({
    server
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



// onlineWss.on("connection", async (socket, req) => {

//     console.log("WebSocket connection received online");
//     const params = new URL(  // converted to URL
//         req.url,
//         "http://localhost"
//     );




//     const authToken = params.searchParams.get("authToken");

//     const user = await FirebaseAuthService.verifyToken(authToken);

//     if (!user) {
//         socket.close();
//         return;
//     }


//     console.log("User connected to websocket");

//     onlineUsers.set(user.username, socket);

//     const users = Array.from(onlineUsers.keys());

//     for (const [username, userSocket] of onlineUsers) {
//         if (userSocket.readyState === 1) {
//             userSocket.send(
//                 JSON.stringify({
//                     header: "online",
//                     users
//                 })
//             );
//         }
//     }


//     socket.on("close", async () => {
//         onlineUsers.delete(user.username);
//         const users = Array.from(onlineUsers.keys());

//         for (const [username, userSocket] of onlineUsers) {
//             if (userSocket.readyState === 1) {
//                 userSocket.send(
//                     JSON.stringify({
//                         header: "online",
//                         users
//                     })
//                 );
//             }
//         }
//     });
// });

