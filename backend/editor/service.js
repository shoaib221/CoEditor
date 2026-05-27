import { Friendship } from "./model.js";

export function sendResponse(load) {
    if (load.error) {
        console.log(load.error);
        return load.res.status(load.status).json(
            {
                success: false,
                message: load.error.message
            }
        )
    }

    load.res.status(load.status).json({
        data: load.data,
        message: load.message,
        success: true
    })
}


export async function FetchFriends(req) {

    let { page, limit, searchFor } = req.query;
    page = parseInt(page || "1");
    limit = parseInt(limit || "10");

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


    return { data, pages }

}