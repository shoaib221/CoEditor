
import { server } from "./starter.js";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";


export const io = new Server(server, {
	cors: {
		origin: [
			"http://localhost:5173",
			"https://chate-shoaib221.netlify.app",
		],
	},
	methods: ["GET", "POST"],
});

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();


export const onlineUserMap = {};
export const my_username = "";





import { User } from "../auth/model.js";

import admin from "firebase-admin";

function run() {

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

run();

export { admin }

// authentication middleware
io.use(async (socket, next) => {
	try {

		const token = socket.handshake.auth?.token;

		if (!token) {
			throw Error("Authentication error");
		}

		const userInfo = await admin.auth().verifyIdToken(token);
		if (!userInfo) throw Error("Authentication error");

		const ret = await User.findOne({ username: userInfo.email });
		if (!ret) throw Error("Authentication error");

		socket.user = ret;
		next();
	} catch (err) {
		next(new Error(err.message));
	}
});



io.on("connection", (socket) => {
	console.log("User connected:", socket.user.username);
	onlineUserMap[socket.user.username] = socket.id;


	console.log(onlineUserMap);
	io.emit('online-users', { onlineUserMap });


	socket.on("test", (data) => {
		console.log("test", socket.user.username)
		io.emit("test", {
			sender: socket.user.username,
			text: data.text,
			time: new Date().toLocaleTimeString(),
		});
	});


	socket.on("disconnect", () => {
		delete onlineUserMap[socket.user.username];
		io.emit('online-users', { onlineUserMap });
		console.log("User disconnected:", socket.user.username);
	});
});







