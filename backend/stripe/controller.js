

import express from "express";
export const paymentRouter = express.Router();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

import { requireAuth } from "../auth/middlewire.js";
const YOUR_DOMAIN = 'http://localhost:5173'; // put in env
import { Parcel } from "./model.js";
import { ObjectId } from "mongodb";
import crypto from "crypto";


function generateTrackingId() {
    const date = new Date();

    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const datePart = `${yy}${mm}${dd}`; // Short date: YYMMDD

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    const timePart = `${hh}${min}${ss}`;

    const cryptoPart = crypto.randomBytes(4).toString("hex").toUpperCase();
    const randomNum = String(Math.floor(1000 + Math.random() * 9000));

    return `PRCL-${datePart}-${timePart}-${cryptoPart}-${randomNum}`;
}

// console.log(generateTrackingId());


const Checkout = async (req, res, next) => {

    try {

        const paymentInfo = req.body;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        unit_amount: paymentInfo.cost,
                        product_data: {
                            name: paymentInfo.parcelName
                        }
                    },
                    quantity: 1
                },
            ],
            customer_email: paymentInfo.email,
            metadata: {
                parcelId: paymentInfo.parcelId
            },
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment_successful?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/payment_canceled`
        });

        res.status(200).json({ url: session.url })
        next()

    } catch (err) {
        res.status(400).json({ error: err.message })
    }


}


const PaymentSuccess = async (req, res, next) => {

    console.log("payment success")

    try {
        const { session_id } = req.body;
        const session = await stripe.checkout.sessions.retrieve(session_id)

        if (session.payment_status === "paid") {
            const parcelId = session.metadata.parcelId;
            const updation = {
                status: "paid",
                transId: session.payment_intent,
                time: new Date()
            }

            const updatedParcel = await Parcel.findByIdAndUpdate(
                new ObjectId(parcelId),
                { paymentInfo: updation },
                { new: true, runValidators: true }
            );
            res.status(200).json({ parcel: updatedParcel })
        }
        else res.status(200).json({
            status: session.status,
            customer_email: session.customer_details.email
        })
        next()
    } catch (err) {
        console.dir(err.message)
        res.status(400).json({ error: err.message })
    }
}


paymentRouter.post('/checkout-session', requireAuth, Checkout);
paymentRouter.post("/success", requireAuth, PaymentSuccess);



