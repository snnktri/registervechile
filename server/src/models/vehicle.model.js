import mongoose, { Schema } from "mongoose";

const vehincleSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    vin: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    engineNumber: {
        type: String,
        //required: true
    },
    make: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

export const Vehicle = mongoose.model("Vehicle", vehincleSchema);