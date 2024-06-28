import mongoose, { Schema } from 'mongoose'

const TicketSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
    },
    subject: {
        type: String,
        maxlength: 100,
        required: true,
        default: "",
    },
    openAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    status: {
        type: String,
        maxlength: 30,
        required: true,
        default: "Pending operator response",
    },

    conversations: [
        {
            sender: {
                type: String,
                maxlength: 50,
                required: true,
                default: "",
            },
            message: {
                type: String,
                maxlength: 1000,
                required: true,
                default: "",
            },
            msgAt: {
                type: Date,
                required: true,
                default: Date.now(),
            },
        },
    ],
})

export const Ticket = mongoose.model("Ticket", TicketSchema)