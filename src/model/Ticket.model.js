import { Ticket } from "./Ticket.schema.js";

export const insertTicket = (ticketObj) => {

    return new Promise((resolve, reject) => {

        Ticket(ticketObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    })
}

