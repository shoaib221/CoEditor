
import mongoose from "mongoose";
import { type } from "os";
import { User } from "../auth/model.js";
import { ref } from "process";


const MessageSchema = new mongoose.Schema({

    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

}, { timestamps: true });


export const Message = mongoose.model('Message', MessageSchema);


const GroupSchema = new mongoose.Schema({
    name: String,

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });


GroupSchema.index({ name: 1, admin: 1 }, { unique: true });

export const Group = mongoose.model("Group", GroupSchema);




const GroupMessageSchema = new mongoose.Schema({
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Group"
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
        enum: ["text", "image", "video", "audio"]
    },
    content: {
        type: String,
        required: true
    }

}, { timestamps: true } );


export const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);


const StorySchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const Story = mongoose.model("Story", StorySchema);



const FriendshipSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    accpetedAt: {
        type: Date,
    }

}, { timestamps: true });


FriendshipSchema.index(
    { senderId: 1, receiverId: 1 },
    { unique: true }
);


export const Friendship = mongoose.model('Friendship', FriendshipSchema);
