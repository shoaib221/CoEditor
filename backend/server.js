// console.log("server");
// 

import { app, server } from "./utils/starter.js";
import mongoose from "mongoose";
import { mainRouter } from "./routes.js";


app.use((req, res, next) => {
	console.log("backend", new Date().toLocaleString());
	next();
});

app.use(mainRouter);


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function run() {

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


run();

export default app;



