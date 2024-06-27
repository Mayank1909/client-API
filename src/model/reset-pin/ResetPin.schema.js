import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
const ResetPinSchema = new Schema({

    pin: {
        type: String,
        minlength: 6,
        maxlength: 6,
        unique: false
    },
    email: {
        type: String,
        maxlength: 50,
        required: true,
        unique: false
    },
    addedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },

});


export const ResetPin = mongoose.model("ResetPin", ResetPinSchema)
