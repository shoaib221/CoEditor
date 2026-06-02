// console.log("server");
// 

import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";


import { app, server } from "./utils/starter.js";
import { mainRouter } from "./routes.js";

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
	console.log("backend", new Date().toLocaleString());
	next();
});

app.use( "/api", mainRouter);



// Catch-all for SPA routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});



const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function connectDB() {

	try {
		// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
		await mongoose.connect(process.env.MONGO_URI, clientOptions);
		await mongoose.connection.db.admin().command({ ping: 1 });
		server.listen(process.env.PORT);
		console.log("Listening to port ", process.env.PORT);
	} catch (err) {
		console.log(err);
	} finally {
		// Ensures that the client will close when you finish/error;
		// await mongoose.disconnect();
	}
}


connectDB();




