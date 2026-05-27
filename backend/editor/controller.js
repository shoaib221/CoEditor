import { Document, Friendship, Group, GroupMembers } from "./model.js";
import { wss } from "../utils/starter.js";
import { User } from "../auth/model.js";
import mongoose from "mongoose";
import * as Y from "yjs";
import { sendResponse } from "./service.js";


const rooms = new Map();

async function getRoom(roomId) {
    if (rooms.has(roomId)) 
    {
        return rooms.get(roomId);
    }

    const ydoc = new Y.Doc();

    const savedDoc = await Document.findOne({ roomId });

    if (savedDoc) {
        Y.applyUpdate(
            ydoc,
            new Uint8Array(savedDoc.snapshot)
        );
    }

    const room = {
        ydoc,
        clients: new Set(),
    };

    rooms.set(roomId, room);

    return room;
}


async function saveRoom(roomId, ydoc) {
    const snapshot = Y.encodeStateAsUpdate(ydoc);

    await Document.findOneAndUpdate(
        { roomId },
        {
            roomId,
            snapshot: Buffer.from(snapshot),
        },
        {
            upsert: true,
            new: true,
        }
    );
}


wss.on("connection", async (socket, req) => {
    const params = new URL(
        req.url,
        "http://localhost"
    );

    const roomId = params.searchParams.get("room");

    console.log( "User connected to websocket", roomId );

    if (!roomId) {
        socket.close();
        return;
    }

    const room = await getRoom(roomId);

    room.clients.add(socket);

    const state = Y.encodeStateAsUpdate(room.ydoc);

    socket.send(state);

    socket.on("message", async (message) => {
        
        try {
            const update = new Uint8Array(message);

            console.log("message", update)

            Y.applyUpdate(
                room.ydoc,
                update
            );

            for (const client of room.clients) {
                if (
                    client !== socket &&
                    client.readyState === 1
                ) {
                    client.send(update);
                }
            }

            await saveRoom(
                roomId,
                room.ydoc
            );
        } catch (err) {
            console.error(err);
        }
    });

    socket.on("close", () => {
        room.clients.delete(socket);

        if (room.clients.size === 0) {
            saveRoom(roomId, room.ydoc);
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
        

        res.status(200).json( {
            friend
        } )
    } catch (err) {
        console.dir(err);
        res.status(400).json( { error: err.message } )
    }
}



export const GetGroup = async (req, res, next) => {
    console.log( "get group" )

    try {
        const { id: groupId } = req.params
        
        let group = await Group.findOne({ _id: groupId })

        console.log(group)

        res.status(200).json( {
            group
        } )
    } catch (err) {
        
        console.dir(err);
        res.status(400).json( { error: err.message } )
    }
}
