import { Document, Friendship, Group, GroupMembers } from "./model.js";
import { wss } from "../utils/starter.js";
import { User } from "../auth/model.js";
import mongoose from "mongoose";
import * as Y from "yjs";
import { sendResponse } from "./service.js";
import { FirebaseAuthService } from "../auth/service.js";


const rooms = new Map();
const onlineUsers = new Map();


async function getRoom(roomId) {

    console.log("Getting room", roomId);
    if (rooms.has(roomId)) {
        return rooms.get(roomId);
    }

    const ydoc = new Y.Doc();

    const savedDoc = await Document.findOne({ roomId });

    if (savedDoc) {
        Y.applyUpdate(
            ydoc,
            new Uint8Array(savedDoc.snapshot) // convert from Binary Buffer to Uint8Array
        );
    }

    const room = {
        roomId,
        ydoc,
        clients: new Set(),
    };

    rooms.set(roomId, room);

    return room;
}


async function saveRoom(roomId, ydoc) {
    const snapshot = Y.encodeStateAsUpdate(ydoc); // converted to unit8Array
    console.log("Saving room", roomId, snapshot, typeof snapshot);
    const buffer = Buffer.from(snapshot); // convert to Binary Buffer
    console.log("Buffer", buffer, typeof buffer);

    await Document.findOneAndUpdate(
        { roomId },
        {
            roomId,
            snapshot: buffer,
        },
        {
            upsert: true,
            new: true,
        }
    );
}


wss.on("connection", async (socket, req) => {

    console.log("WebSocket connection received");
    const params = new URL(  // converted to URL
        req.url,
        "http://localhost"
    );

    const roomId = params.searchParams.get("room");
    const authToken = params.searchParams.get("authToken");

    if (!authToken) {
        socket.close();
        return;
    }

    const user = await FirebaseAuthService.verifyToken(authToken);

    if (!user) {
        socket.close();
        return;
    }

    onlineUsers.set(user.username, socket);

    for (const [username, userSocket] of onlineUsers) {
        if (userSocket.readyState === 1) {
            userSocket.send(
                JSON.stringify({
                    header: "onlineUsers",
                    users: Array.from(onlineUsers.keys())
                })
            );
        }
    }

    if (!roomId) {

        socket.on("close", async () => {

            onlineUsers.delete(user.username);

            for (const [username, userSocket] of onlineUsers) {
                if (userSocket.readyState === 1) {
                    userSocket.send(
                        JSON.stringify({
                            header: "onlineUsers",
                            users: Array.from(onlineUsers.keys())
                        })
                    );
                }
            }
        });

        return;
    }

    console.log("User connected to websocket", roomId);

    const room = await getRoom(roomId);

    room.clients.add(socket);

    const state = Y.encodeStateAsUpdate(room.ydoc);

    socket.send(
        JSON.stringify({
            header: "update",
            update: Array.from(state)
        })
    );

    console.log("Sent initial document state to client");

    //  receiving updates from clients
    socket.on("message", async (message) => {

        message = JSON.parse(message);
        console.log("message received", message.header);


        try {
            const update = new Uint8Array(message.update);

            console.log("message", update);

            Y.applyUpdate(
                room.ydoc,
                update
            );

            console.log("Applied update to Y.Doc");

            await saveRoom(
                roomId,
                room.ydoc
            );

            console.log("Saved room to database");

            for (const client of room.clients) {
                if (
                    client !== socket &&
                    client.readyState === 1
                ) {
                    client.send(
                        JSON.stringify({
                            header: "update",
                            update: Array.from(update)
                        })
                    );
                }
            }

            console.log("Broadcasted update to other clients");

        } catch (err) {
            console.error(err);
        }
    });


    // connection closed
    socket.on("close", async () => {
        room.clients.delete(socket);

        if (room.clients.size === 0) {
            await saveRoom(roomId, room.ydoc);
        }
        
    });
});



export const GetFriend = async (req, res, next) => {

    try {
        const { id: friendId } = req.params

        let friend = await User.findOne({ _id: friendId })

        const friendship = await Friendship.findOne({
            $or: [
                {
                    senderId: new mongoose.Types.ObjectId(friendId),
                    receiverId: req.user_id,
                },
                {
                    receiverId: new mongoose.Types.ObjectId(friendId),
                    senderId: req.user_id,
                },
            ],
        });

        // console.log( friend, friendship )
        friend = friend.toObject()

        friend.friendship = friendship;
        friend["friendship"] = friendship
        // console.log(friend)


        res.status(200).json({
            friend
        })
    } catch (err) {
        console.dir(err);
        res.status(400).json({ error: err.message })
    }
}



export const GetGroup = async (req, res, next) => {
    console.log("get group")

    try {
        const { id: groupId } = req.params

        let group = await Group.findOne({ _id: groupId })

        console.log(group)

        res.status(200).json({
            group
        })
    } catch (err) {

        console.dir(err);
        res.status(400).json({ error: err.message })
    }
}
