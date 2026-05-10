
import { admin } from '../utils/socket.js';



export const requireAuth = async (req, res, next) => {
    // for firebase
    // console.dir(req.headers)
    // console.log("###################################")
    console.log( "require auth" )
    try {
        if (!req.headers) throw Error('headers required');
        if (!req.headers.authorization) throw Error('token required');
        const token = req.headers.authorization.split(' ')[1];
        if (!token) throw Error('token required');
        const userInfo = await admin.auth().verifyIdToken(token);
        if (!userInfo) throw Error('invalid token');
        // console.log(userInfo)
        const ret = await User.findOne({ username: userInfo.email });
        
        if (!ret) throw Error("No such user. Please sign up!");
        //console.log( ret )
        req.user_email = ret.username;
        req.username = ret.username;
        req.name = ret.name;
        req.user_id = ret._id;
        //console.dir(user);
        next();
    } catch (err) {
        console.dir(err)
        res.status(401).json({ error: err.message })
    }
}


import jwt from 'jsonwebtoken';
import { User } from './model.js';


// header, pyload, signature
export const requireAuthJWT = async (req, res, next) => {

    const { authorization } = req.headers;

    try {
        if (!authorization) throw Error('Authorization token missing');
        const token = authorization.split(' ')[1];
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        const ret = await User.findOne({ _id });
        if (!ret) throw Error("No such user");
        req.user_id = ret._id.toString();
        req.username = ret.username;
        next();
    } catch (err) {
        console.log(err.message, "backend");
        res.status(401).json({ error: ' no file' });
    }
}

// #todo

export const requireAdmin = async (req, res, next) => {
    //console.log("require admin")
    try {
        let user = await User.findOne( { username: req.user_email } );
        //console.dir(user)
        //console.log(user)
        if( user.role !== 'admin' ) throw Error("Only admins can access!");
        //console.log( user )
        next();
    } catch (err) {
        res.status(400).json( { error: err.message } );
    }
}


export const requireModerator = async (req, res, next) => {
    //console.log("require admin")
    try {
        let user = await User.findOne( { username: req.user_email } );
        //console.dir(user)
        //console.log(user)
        if( user.role !== 'moderator' ) throw Error("Only Moderators can access!");
        //console.log( user )
        next();
    } catch (err) {
        res.status(400).json( { error: err.message } );
    }
}









// ✅ 1xx – Informational
// 100 – Continue

// Server received the initial request; client should continue sending the rest.

// ✅ 2xx – Success
// 200 – OK

// Request succeeded.
// (Used for GET, POST, PUT, DELETE responses.)

// 201 – Created

// A new resource was successfully created (e.g., after POST).

// 204 – No Content

// Request succeeded but no response body is returned.

// ✅ 3xx – Redirection
// 301 – Moved Permanently

// Resource URL has permanently changed.

// 302 – Found

// Temporary redirect to another URL.

// 304 – Not Modified

// Client can use cached version of the resource.

// ✅ 4xx – Client Errors
// 400 – Bad Request

// Incorrect or malformed request sent by the client.

// 401 – Unauthorized

// Client is not authenticated.
// (Usually means missing/invalid token.)

// 403 – Forbidden

// Client is authenticated but not allowed to access the resource.

// 404 – Not Found

// The requested resource does not exist.

// 409 – Conflict

// Request conflicts with server state (e.g., duplicate entry).

// 422 – Unprocessable Entity

// Request is understood but invalid (validation error).

// ✅ 5xx – Server Errors
// 500 – Internal Server Error

// Server failed to process request due to an unexpected error.

// 502 – Bad Gateway

// Server got an invalid response from another server.

// 503 – Service Unavailable

// Server is down or overloaded.

// 504 – Gateway Timeout

// Server took too long to respond.