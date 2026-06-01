import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { firebaseAdmin } from "../utils/starter.js"
import { User } from "./model.js";




// JWT token service **********

const createToken = (_id, username) => {
    return jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const VerifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (err) {
        console.dir(err);
        return null;
    }
}


export const JWTService = {
    createToken,
    verifyToken: VerifyToken
}


// Firbase Auth token service **********

async function VerifyIdToken(token) {
    if (!token) return null;
    const userInfo = await firebaseAdmin.auth().verifyIdToken(token);
    if (!userInfo) return null;
    const ret = await User.findOne({ username: userInfo.email });
    return ret;
}


export const FirebaseAuthService = {
    verifyToken: VerifyIdToken
}


// password service **********

async function hashPassword(pass) {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(pass, salt);
    return hashpass;
}

async function comparePassword(pass, hash) {
    return await bcrypt.compare(pass, hash);
}

export const PasswordService = {
    hashPassword,
    comparePassword
}
