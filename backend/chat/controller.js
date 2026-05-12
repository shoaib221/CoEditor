//console.log("controller");


import { User } from "../auth/model.js";
import { Message, Group, GroupMessage, Story, Friendship } from "./model.js";
import { io, onlineUserMap } from '../utils/socket.js';
import { ObjectId } from "mongodb";
import mongoose from "mongoose";


//console.log( "controller", onlineUserMap);


export const fetchMessage = async (req, res, next) => {
	console.log("fetch message");

	try {
		const { id } = req.body;

		const partner = await User.findOne({
			_id: new ObjectId(id)
		})


		//console.log( sender, receiver );
		const messages = await Message.find({
			$or: [
				{ receiver: req.username, sender: partner.username },
				{ receiver: partner.username, sender: req.username },
			],
		});

		//console.log(messages);

		res.status(200).json({ messages, partner });

	} catch (error) {
		console.dir(error)
		res.status(400).json({ error: error.message });
	}
}




export const sendMessage = async (req, res) => {
	try {
		console.dir("sm");
		//console.dir(req.body)


		const { receiver, messages } = req.body;

		//console.log( receiver, messages )

		const saved_messages = []

		for (const elem of messages) {
			const newMessage = await Message.create({
				sender: req.username,
				receiver,
				type: elem.type,
				content: elem.content
			})

			//console.log(newMessage)

			saved_messages.push(newMessage)
		}

		console.log(saved_messages)

		const receiver_socket_id = onlineUserMap[receiver];
		if (receiver_socket_id) {
			console.log("emitting message to socket:", receiver_socket_id, receiver);
			io.to(receiver_socket_id).emit("receive_message", { messages: saved_messages });
		}

		return res.status(200).json({ messages: saved_messages });

	} catch (err) {
		console.error(err);
		return res.status(400).json({ error: err.message });
	}
};

export const sendGroupMessage = async (req, res) => {
	try {
		console.dir("send group message #########################################");
		//console.dir(req.body)


		const { receiver, messages } = req.body;

		//console.log( receiver, messages )

		const saved_messages = []

		console.log("here")

		for (const elem of messages) {
			const newMessage = await GroupMessage.create({
				sender_id: req.user_id,
				group_id: receiver._id,
				type: elem.type,
				content: elem.content
			})


			const newMessage2 = await GroupMessage.findOne({ _id: newMessage._id }).populate("sender_id", "username _id photo");

			//console.log(newMessage)

			saved_messages.push(newMessage2)
		}

		console.log("here2")

		console.log("saved_messages", saved_messages);

		for (let member of receiver.members) {
			console.log(member)
			if (member.username === req.username) continue;
			let receiver_socket_id = onlineUserMap[member.username];
			if (receiver_socket_id) {
				console.log("emitting message to socket:", receiver_socket_id, receiver);
				io.to(receiver_socket_id).emit("receive_group_message", { messages: saved_messages });
			}
		}



		return res.status(200).json({ messages: saved_messages });

	} catch (err) {
		console.error(err);
		return res.status(400).json({ error: err.message });
	}
};




export const FetchUsers = async (req, res, next) => {
	console.log("fetch users")
	try {
		//console.log( req.username )
		const users = await User.find({ username: { $ne: req.username } })
		//console.log( users )
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

		const new_group = await Group.create({
			admin: req.user_id,
			name: newGroup,
			members: [req.user_id]
		})


		res.status(200).json({ new_group })
	} catch (err) {

		if (err.code === 11000) {
			const field = Object.keys(err.keyValue)[0];
			return res.status(400).json({ error: "You already have a group of this name" })
		}
		res.status(400).json({ error: err.message })
	}
}


export const FetchGroups = async (req, res, next) => {
	console.log("fetch groups #############################################");
	console.log(req.user_id);
	try {
		let { page, limit, searchFor } = req.query;
		page = parseInt(page);
		limit = parseInt(limit);

		const userId = req.user_id;

		const groups = await Group.aggregate([
			{
				$match: {
					members: req.user_id,
					name: { $regex: searchFor, $options: "i" }
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

		const data = groups[0]?.data || [];
		const total = groups[0]?.pages[0]?.count || 0;
		const pages = Math.ceil(total / limit);


		res.status(200).json({ data, pages });
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}


export const AddToGroup = async (req, res, next) => {
	console.log("add to group")
	try {
		let { new_member, group } = req.body
		console.log(new_member, group)

		await Group.updateOne(
			{ _id: group._id },
			{
				$addToSet: { members: new_member._id }
			}
		)



		res.status(200).json({})
	} catch (err) {
		res.status(400).json({ error: err.message })
		console.log(err)
	}
}


export const DeleteFromGroup = async (req, res, next) => {
	console.log("remove from group")
	try {
		let { member, group } = req.body
		console.log(member, group)

		await Group.updateOne(
			{ _id: group._id },
			{
				$pull: { members: member._id }
			}
		);

		res.status(200).json({})
	} catch (err) {
		res.status(400).json({ error: err.message })
		console.log(err)
	}
}


export const FetchGroupMembers = async (req, res, next) => {
	console.log("fetch group members")
	try {
		const { group_id, member } = req.body
		const data = await GroupMembers.find({ group_id })
		res.status(200).json(data)
	} catch (err) {
		res.status(200).json({ error: err.message })
	}
}



export const FetchGroupMessage = async (req, res, next) => {
	console.log("fetch group message");

	try {
		const { id: group_id } = req.params;
		const group = await Group.findOne({ _id: group_id }).populate("members", "name _id username photo").populate("admin", "name _id username photo");
		const messages = await GroupMessage.find({ group_id }).populate("sender_id", "username _id photo");
		//console.log(messages)
		res.status(200).json({ messages, partner: group });
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

export const DeleteGroup = async (req, res, next) => {
	console.log("delete group")
	try {
		const { group_id } = req.body;

		if (!mongoose.Types.ObjectId.isValid(group_id)) {
			return res.status(400).json({ error: "Invalid group id" });
		}

		const group = await Group.findById(group_id);

		if (!group) {
			return res.status(404).json({ error: "Group not found" });
		}

		await Group.deleteOne({ _id: group_id })
		await GroupMessage.deleteMany({ group_id })
		res.status(200).json({ message: "Success" })
	} catch (err) {
		console.log(err.message)
		res.status(400).json({ error: err.message })
	}
}


export const LeaveGroup = async (req, res, next) => {
	console.log("leave group")
	try {
		const { group_id } = req.body

		if (!mongoose.Types.ObjectId.isValid(group_id)) {
			return res.status(400).json({ error: "Invalid group id" });
		}

		const group = await Group.findById(group_id);

		if (!group) {
			return res.status(404).json({ error: "Group not found" });
		}

		if (group.admin.equals(req.user_id)) {
			return res.status(400).json({
				error: "Admin cannot leave. Transfer ownership or delete group."
			});
		}

		const result = await Group.updateOne(
			{ _id: group_id },
			{ $pull: { members: req.user_id } }
		);

		
		res.status(200).json({ message: "Success" })
	} catch (err) {
		console.log(err.message);
		res.status(400).json({ error: err.message })
	}
}




export const GroupMessageCont = async (req, res, next) => {
	console.log("group message cont")
	try {
		const { text, group_id } = req.body
		let messages = []
		//console.log( req.files )
		if (text) messages.push(new GroupMessage({ text, sender: req.username, group_id, createdAt: new Date().toLocaleString() }))

		for (let key in req.files) {
			for (item of req.files[key]) {
				//console.log(item)

				messages.push(new GroupMessage({
					sender: req.username,
					group_id,
					mediaType: key,
					mediaURL: 'http://localhost:4000/messages/' + item.filename,
					createdAt: new Date().toLocaleString()
				}))
			}
		}


		let saved_messages = []
		for (let i = 0; i < messages.length; i++) {
			let result = await messages[i].save()
			//console.log(result)
			saved_messages.push(result)
		}

		//console.log("group message");

		const group_members = await GroupMembers.find({ group_id })

		//console.log( "online", onlineUserMap );


		group_members.forEach(x => {
			//console.log(x)
			if (onlineUserMap[x.member])
				//console.log(x.member)
				io.to(onlineUserMap[x.member]).emit("newGroupMessage", saved_messages)
		})
		res.status(200).json("ok")


	} catch (err) {
		res.status(400).json({ error: 'backend ' + err.message })
	} finally {
		//console.log( 'photo' )
		next()
	}
}


export const CreateStory = async (req, res, next) => {
	console.log("create story")
	try {
		const { text } = req.body;
		console.log(text)
		let story = null;
		console.log(story)
		if (text) {
			story = new Story({ owner: req.username, type: "text", url: text })
			story = await story.save()
		}
		else if (req.files.length > 0) {
			story = new Story({
				owner: req.username,
				type: req.files[0].mimetype.substr(0, 5),
				url: "http://localhost:4000/messages/" + req.files[0].filename
			})

			story = await story.save()
		}

		res.status(200).json(story)
	} catch (err) {
		console.log(err.message)
		res.status(400).json({ error: err.message })
	}
}


export const FetchStory = async (req, res, next) => {

	try {
		let stories = await Story.find({});
		res.status(200).json(stories);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}


}





