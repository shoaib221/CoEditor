

import express from "express";
import { authRouter } from "./auth/controller.js";
import { paymentRouter } from "./stripe/controller.js";
import { scholarshipRouter } from "./scholar/controller.js";
import { testRouter } from "./test/controller.js";
import { productRouter } from "./products/controller.js"
import { freelancerRouter } from "./freelancer/controller.js"
import { chatRouter } from "./chat/route.js";

export const mainRouter = express.Router();




mainRouter.use("/auth", authRouter);
mainRouter.use("/payment", paymentRouter);
mainRouter.use("/scholarship", scholarshipRouter); // scholarstream
mainRouter.use("/test", testRouter);
mainRouter.use("/product" , productRouter );
mainRouter.use("/freelancer", freelancerRouter );
mainRouter.use("/chat", chatRouter );  // chat.e

mainRouter.all(/.*/, (req, res) => {
    res.status(404).json({ error: "Invalid route" })
})



// mainRouter.use( "/chat", chatRouter );




