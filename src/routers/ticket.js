import { Router } from 'express'
import { insertTicket } from '../model/Ticket.model.js';
const router = Router()


// workflow

// create endpoints 
// recieving new ticket request
// Authorising every request with jwt
// insert in mongodb
// retrieve all the ticket from the specific
// retrieve a ticket from mongo
// update message conversation in the ticket data base
// update ticket status
// delete the ticket from database



const ticketRouter = router.all("/", (req, res, next) => {
    // res.json({ message: "return form ticket router" })
    next();
})


router.post("/", async (req, res, nect) => {
    const { subject, sender, message } = req.body;
    const ticketObj = {
        clientId: '665ee13e0142603154eb16ca',
        subject,
        conversations: [
            {
                sender,
                message,
            }
        ],
    };
    const result = await insertTicket(ticketObj);
    if (result._id) {
        return res.status(200).json({ message: "success" })
    }

    res.status(400).json({ message: error })
})

export default ticketRouter;