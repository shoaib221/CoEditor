

import { User } from "../auth/model.js"
import { Friendship, Group, GroupMembers, Document, Variable } from "./model.js"
import { FetchFriends, sendResponse } from "./service.js"


export const FetchUsers = async (req, res, next) => {
    console.log("fetch users")
    try {
        const users = await User.find({ username: { $ne: req.username } })
        res.status(200).json({ users })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


export const CreateGroup = async (req, res, next) => {
    console.log("create group")
    try {
        const { newGroup } = req.body
        console.log(newGroup)

        let roomCount = await Variable.findOneAndUpdate(
            { name: "room-count" },
            { $inc: { value: 1 } },
            { new: true }
        );

        let new_group = await Group.create({
            name: newGroup,
            admin: req.username,
            roomId: roomCount.value
        })

        const me = await User.findOne({ username: req.username })

        const new_member = await GroupMembers.create({
            group_id: new_group._id,
            group_name: newGroup,
            member: req.username,
            photo: me.photo,
            admin: req.username
        })

        res.status(200).json({})
    } catch (error) {
        if (error.code === 11000) {

            return sendResponse({
                res,
                error: {
                    message: `Group already exists`
                },
                status: 400
            })


        }

        sendResponse({
            res,
            error,
            status: 400
        })


    }
}


export const FetchGroups = async (req, res, next) => {
    console.log("fetch groups")
    try {
        const groups = await GroupMembers.find({ member: req.username })
        let pages = groups?.length;
        if (pages) pages = Math.ceil(pages / 10)
        console.log(groups)
        res.status(200).json({ data: groups, pages })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


export const AddToGroup = async (req, res, next) => {
    console.log("add to group")
    try {
        const { new_member, group_name } = req.body
        console.log(new_member, group_name)

        const group = await Group.findOne({ name: group_name, admin: req.username })
        const nmember = await User.findOne({ username: new_member })
        const new_data = new GroupMembers({
            group_id: group._id,
            group_name: group.name,
            member: new_member,
            photo: nmember.photo,
            admin: req.username
        })

        const saved_data = await new_data.save()

        res.status(200).json(saved_data)
    } catch (err) {
        res.status(400).json({ error: err.message })
        console.log(err)
    }
}


export const DeleteFromGroup = async (req, res, next) => {
    console.log("delete from group")
    try {
        const { group_id, member } = req.body
        await GroupMembers.deleteOne({ group_id, member })
        res.status(200).json("ok")
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
    finally {
        next()
    }
}


export const FetchGroupMembers = async (req, res, next) => {
    console.log("fetch group members")
    try {

        let { group_id } = req.params;
        let { page, searchFor } = req.query;
        page = parseInt(page || "1");
        let limit = 10;

        const result = await GroupMembers.aggregate([
            {
                $match: { group_id }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "member",
                    foreignField: "username",
                    as: "memberInfo"
                }
            },
            {
                $unwind: "$memberInfo"
            },
            {
                $replaceRoot: { newRoot: "$memberInfo" }
            },
            {
                $match: {
                    "name": { $regex: searchFor || "", $options: "i" }
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    pages: [
                        { $count: "count" }
                    ]
                }
            }
        ]);

        const data = result[0]?.data || [];
        let pages = result[0]?.pages[0]?.count || 0;
        pages = Math.ceil(pages / limit);


        res.status(200).json({ data, pages })
    } catch (err) {
        res.status(200).json({ error: err.message })
    }
}


export const FetchNonMemberFriends = async (req, res, next) => {
    console.log("fetch group non-members")
    try {
        const { searchFor, page } = req.query
        const { group_id } = req.params
        const userId = req.user_id
        const members = await GroupMembers.find({ group_id })

        let friends = await Friendship.aggregate([
            {
                $match: {
                    status: "accepted",
                    $or: [
                        { senderId: userId },
                        { receiverId: userId }
                    ]
                }
            },
            {
                $addFields: {
                    friendId: {
                        $cond: [
                            { $eq: ["$senderId", userId] },
                            "$receiverId",
                            "$senderId"
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "friendId",
                    foreignField: "_id",
                    as: "friend"
                }
            },
            {
                $unwind: "$friend"
            },
            {
                $replaceRoot: { newRoot: "$friend" }
            },
            {
                $match: {
                    "name": { $regex: searchFor, $options: "i" }
                }
            },
        ])

        console.log(friends)

        let member_set = new Set()

        members.forEach(elem => member_set.add(elem.member))

        friends = friends.filter( elem => !member_set.has( elem.username ) )

        console.log(friends)

        let total = friends.length
        let pages = Math.ceil( total / 10 )

        let data = []

        for( let i= (page -1) *10, j=i ; i < total && i < j+10 ; i++  ) data.push( friends[i] )
            
        res.status(200).json( {data, pages, total, page})
    } catch (err) {
        console.log(err)
        res.status(200).json({ error: err.message })
    }

}


export const DeleteGroup = async (req, res, next) => {
    console.log("delete group")
    try {
        const { group_id } = req.body
        await Group.deleteOne({ _id: group_id })
        await GroupMembers.deleteMany({ group_id })
        await GroupMessage.deleteMany({ group_id })
        res.status(200).json("ok")
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


export const LeaveGroup = async (req, res, next) => {
    console.log("leave group")
    try {
        const { group_id } = req.body
        await GroupMembers.deleteOne({ member: req.username });
        res.status(200).json("Left From The Group")
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


export const SendFriendRequest = async (req, res, next) => {
    try {
        let { receiver } = req.body;

        let senderId = req.user_id, receiverId = receiver._id

        let roomCount = await Variable.findOneAndUpdate(
            { name: "room-count" },
            { $inc: { value: 1 } },
            { new: true }
        );

        let newRequest = await Friendship.create({
            senderId, receiverId, status: 'pending', roomId: 1
        })

        return res.status(200).json({ newRequest })
    }
    catch (error) {

        console.log(error);

        return res.status(400).json({ error })
    }
}


export const GetFriends = async (req, res, next) => {

    try {
        let result = await FetchFriends(req)
        res.status(200).json(result);

    } catch (err) {
        console.dir(err);
        res.status(400).json({ error: err });
    }
}


export const GetUsers = async (req, res, next) => {

    try {

        const userId = req.user_id;
        const { page = 1, limit = 10, searchFor = "" } = req.query;

        console.log(userId)

        const introduced = await Friendship.aggregate([
            {
                $match: {
                    status: { $in: ["accepted", "pending"] },
                    $or: [
                        { senderId: userId },
                        { receiverId: userId }
                    ]
                }
            },
            {
                $addFields: {
                    introId: {
                        $cond: [
                            { $eq: ["$senderId", userId] },
                            "$receiverId",
                            "$senderId"
                        ]
                    }
                }
            },

        ]);

        console.log("introduced", introduced)

        const set = new Set();
        for (const elem of introduced) {
            set.add(elem.introId.toString())
        }

        console.dir(set)

        let users = await User.aggregate([
            {
                $match: {
                    name: {
                        $regex: searchFor,
                        $options: "i"
                    }
                }
            }
        ]);

        users = users.filter(elem => !set.has(elem._id.toString()) && elem._id.toString() !== req.user_id.toString());
        console.log(users)
        let pages = Math.ceil(users.length / limit);
        let data = [];
        for (let i = (page - 1) * limit, j = (page - 1) * limit; j < Math.min(i + limit, users.length); j++) data.push(users[j])
        res.status(200).json({ data, pages });

    }
    catch (error) {
        console.dir(error);
        res.status(400).json({ error });
    }
}



export const GetFriendRequests = async (req, res, next) => {
    try {
        const userId = req.user_id;
        let { page, limit, searchFor } = req.query;
        page = parseInt(page)
        limit = parseInt(limit)

        const requests = await Friendship.aggregate([
            {
                $match: {
                    status: "pending",
                    receiverId: userId
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "senderId",
                    foreignField: "_id",
                    as: "friend"
                }
            },
            { $unwind: "$friend" },
            {
                $replaceRoot: { newRoot: "$friend" }
            },
            {
                $match: {
                    "name": { $regex: searchFor, $options: "i" }
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    pages: [
                        { $count: "count" }
                    ]
                }
            }
        ]);

        const data = requests[0]?.data || [];
        const total = requests[0]?.pages[0]?.count || 0;
        const pages = Math.ceil(total / limit);

        return res.status(200).json({ data, pages })
    } catch (error) {
        console.dir(error);
        return res.status(400).json({ error })
    }
}




export const GetSentRequests = async (req, res, next) => {
    try {
        const userId = req.user_id;
        let { page, limit, searchFor } = req.query;
        page = parseInt(page)
        limit = parseInt(limit)

        const requests = await Friendship.aggregate([
            {
                $match: {
                    status: "pending",
                    senderId: userId
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "receiverId",
                    foreignField: "_id",
                    as: "friend"
                }
            },
            { $unwind: "$friend" },
            {
                $replaceRoot: { newRoot: "$friend" }
            },
            {
                $match: {
                    "name": { $regex: searchFor, $options: "i" }
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    pages: [
                        { $count: "count" }
                    ]
                }
            }
        ]);

        const data = requests[0]?.data || [];
        const total = requests[0]?.pages[0]?.count || 0;
        const pages = Math.ceil(total / limit);

        return res.status(200).json({ data, pages })
    } catch (error) {
        console.dir(error);
        return res.status(400).json({ error })
    }
}



export const ChatTest = async (req, res, next) => {
    try {
        return res.status(200).json({ message: "success" })
    }
    catch (err) {
        return res.status(400).json({ message: "failed" })
    }
}


export const CancelRequest = async (req, res, next) => {
    try {
        let { receiver } = req.body;
        let receiverId = receiver._id;
        let senderId = req.user_id;

        await Friendship.deleteMany({
            senderId,
            receiverId
        })

        return res.status(200).json({ message: "success" })
    }
    catch (err) {
        return res.status(400).json({ message: "failed" })
    }
}


export const Unfriend = async (req, res, next) => {
    try {
        let { friend } = req.body;
        let receiverId = friend._id;
        let senderId = req.user_id;

        await Friendship.deleteMany({
            senderId,
            receiverId
        })

        await Friendship.deleteMany({
            receiverId: senderId,
            senderId: receiverId
        })

        return res.status(200).json({ message: "success" })
    }
    catch (err) {
        return res.status(400).json({ message: "failed" })
    }
}




export const RejectRequest = async (req, res, next) => {
    try {
        let { sender, verdict } = req.body;
        let receiverId = req.user_id;
        let senderId = sender._id;


        if (verdict === 'rejected') {
            await Friendship.deleteMany({
                senderId,
                receiverId
            })
        }
        else {

            let roomCount = await Variable.findOneAndUpdate(
                { name: "room-count" },
                { $inc: { value: 1 } },
                { new: true }
            );


            await Friendship.updateOne(
                {
                    receiverId, senderId
                },
                {
                    $set: {
                        status: 'accepted',
                        accpetedAt: new Date(),
                        roomId: roomCount.value
                    }
                }

            )
        }



        return res.status(200).json({ message: "success" })
    }
    catch (err) {
        return res.status(400).json({ message: "failed" })
    }
}


