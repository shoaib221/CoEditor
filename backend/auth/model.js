
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    name: {
        type: String,
    },
    bio : {
        type: String,
    },
    photo: {
        type: String,
        required: true,
        default: "https://i.ibb.co.com/6cPtkRnW/dummy-avatar.jpg"
    },
    role : {
        type: String,
        required: true,
        default: "student"
    },
    constact: {
        type: String,
    },
    location: {
        type: String
    }, 
    profession: {
        type: String
    }
});

export const User = mongoose.model("User", UserSchema);


const CountSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count : {
        type: Number,
        required: true
    }
})

export const Count = mongoose.model("Count", CountSchema)