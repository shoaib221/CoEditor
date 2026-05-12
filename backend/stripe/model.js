import mongoose from 'mongoose';

const ParcelSchema = new mongoose.Schema({
    
    parcelName: {
        type: String,
    },
    buyer: {
        type: String,
    },
    description : {
        type: String,
    },
    price: {
        type: Number
    },
    paymentInfo : {
        transId: String,
        price: Number,
        time: Date,
        status: String
    },
    paymentStatus: {
        type: String
    }
});

export const Parcel = mongoose.model("Parcel", ParcelSchema);
