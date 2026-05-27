

import express from "express";
import { authRouter } from "./auth/controller.js";
import { paymentRouter } from "./stripe/controller.js";
import { testRouter } from "./test/controller.js";
import { editorRouter } from "./editor/route.js";
export const mainRouter = express.Router();


mainRouter.use("/auth", authRouter);
mainRouter.use("/test", testRouter);
mainRouter.use("/editor", editorRouter);

mainRouter.all(/.*/, (req, res) => {
    res.status(404).json({ error: "Invalid route" })
});



// mainRouter.use( "/chat", chatRouter );

