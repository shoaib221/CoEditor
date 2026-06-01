import mongoose from "mongoose";
import { type } from "os";
import { User } from "../auth/model.js";



const documentSchema = new mongoose.Schema(
    {
        roomId:
        {
            type: String,
            required: true,
            unique: true,
        },
        snapshot:
        {
            type: Buffer,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Document = mongoose.model("Document", documentSchema);



const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    roomId:
    {
        type: String,
        required: true,
        unique: true,
    },
},
    { timestamps: true }
)

GroupSchema.index({ name: 1, admin: 1 }, { unique: true });

export const Group = mongoose.model("Group", GroupSchema);



const GroupMembersSchema = new mongoose.Schema({

    group_id: {
        type: String,
        required: true
    },
    group_name: {
        type: String,
        required: true
    },
    member: {  // username
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

GroupMembersSchema.index({ group_id: 1, member: 1 }, { unique: true });

export const GroupMembers = mongoose.model("GroupMember", GroupMembersSchema);



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
    },
    roomId:
    {
        type: String,
        required: true,
        unique: true,
    },


}, { timestamps: true });


FriendshipSchema.index(
    { senderId: 1, receiverId: 1 },
    { unique: true }
);


export const Friendship = mongoose.model('Friendship', FriendshipSchema);



const VariableSchema = new mongoose.Schema({

    value: {
        type: Number,
    },
    name: {
        type: String,
        unique: true,
        required: true
    }


}, { timestamps: true });



export const Variable = mongoose.model('Variable', VariableSchema);


async function InitDb(params) {
    let roomCount = await Variable.findOne(
        { name: "room-count" }
    )

    roomCount = await Variable.findOneAndUpdate(
        { name: "room-count" },
        {
            name: "room-count",
            value: (roomCount ? roomCount.value : 1001)
        },
        {
            upsert: true,
            new: true
        }
    )

    console.log( roomCount.value )
}

InitDb();
