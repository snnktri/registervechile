import mongoose, { Schema } from "mongoose";

const regSchema = new Schema({
        vehicle: {
             type: Schema.Types.ObjectId, ref: 'Vehicle', required: true 
            },
        owner: {
             type: Schema.Types.ObjectId, ref: 'User', required: true 
            }, // Owner
        registrationDate: {
             type: Date, required: true 
            },
        expiryDate: {
             type: Date, required: true 
            },
        status: {
             type: String, enum: ['active', 'expired', 'suspended'], default: 'active' 
            },
         registrationFee: {
             type: Number,
             required: true 
            },
        registrationStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: "pending"
        }
},
{
    timestamps: true
})

export const Registration = mongoose.model("Registration", regSchema);