import { Ticket } from "./Ticket.schema.js";

export const insertTicket = (ticketObj) => {

    return new Promise((resolve, reject) => {

        Ticket(ticketObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    })
}


export const getTickets = (clientId) => {

    return new Promise((resolve, reject) => {

        Ticket
            .find({ clientId })
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    })
}

