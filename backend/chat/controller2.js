
import { User } from "../auth/model.js";
import { Friendship } from "./model.js";


export const SendFriendRequest = async (req, res, next) => {
    try {
        let { receiver } = req.body;

        let senderId = req.user_id, receiverId = receiver._id

        let newRequest = await Friendship.create({
            senderId, receiverId, status: 'pending'
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
        let { page, limit, searchFor } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const userId = req.user_id;

        const friends = await Friendship.aggregate([
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

        const data = friends[0]?.data || [];
        const total = friends[0]?.pages[0]?.count || 0;
        const pages = Math.ceil(total / limit);


        res.status(200).json({ data, pages });

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
        console.log(err.message)
        return res.status(400).json({ error: err.message })
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
            await Friendship.updateOne(
                {
                    receiverId, senderId
                },
                {
                    $set: {
                        status: 'accepted',
                        accpetedAt: new Date()
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

