
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";




export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


export const server = http.createServer(app);

