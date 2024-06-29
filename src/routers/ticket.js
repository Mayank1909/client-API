import { Router } from 'express'
import { insertTicket, getTickets, getTicketsById, updateClientReply, updateStatusClose } from '../model/Ticket.model.js';
import { userAuthorization } from '../middleware/authorisation.js';

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

// get a new ticket 
router.post("/", userAuthorization, async (req, res, nect) => {
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


// getting all ticket for a specific user 

router.get("/", userAuthorization, async (req, res, nect) => {

    const userId = req.userId
    const result = await getTickets(userId);

    return res.status(200).json({ result })

    res.status(400).json({ message: error })
})

// getting a specific ticket 
router.get("/:_id", userAuthorization, async (req, res, nect) => {

    const { _id } = req.params;
    const userId = req.userId
    const result = await getTicketsById(_id, userId);

    return res.status(200).json({ result })

    res.status(400).json({ message: error })
})

// updating a ticket form client
router.put("/:_id", userAuthorization, async (req, res, nect) => {
    const { message, sender } = req.body;

    const { _id } = req.params;
    const userId = req.userId
    const result = await updateClientReply({ _id, message, sender });

    return res.status(200).json({ result })

    res.status(400).json({ message: error })
})

// update status to close
router.patch("/close-ticket/:_id", userAuthorization, async (req, res, nect) => {

    const { _id } = req.params;
    const clientId = req.userId
    const result = await updateStatusClose({ _id, clientId });
    if (result._id) {

        return res.status(200).json({ message: "ticket has been closed" });
    }

    res.status(400).json({ message: error })
})

export default ticketRouter;