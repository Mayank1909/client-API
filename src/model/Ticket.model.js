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
export const getTicketsById = (_id, clientId) => {

    return new Promise((resolve, reject) => {

        Ticket
            .find({ _id, clientId })
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    })
}
export const updateClientReply = ({ _id, message, sender }) => {
    return new Promise((resolve, reject) => {
        try {
            Ticket.findOneAndUpdate(
                { _id },
                {
                    status: "Pending operator response",
                    $push: {
                        conversations: { message, sender },
                    },
                },
                { new: true }
            )
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });

};

export const updateStatusClose = ({ _id, clientId }) => {
    return new Promise((resolve, reject) => {
        try {
            Ticket.findOneAndUpdate(
                { _id, clientId },
                {
                    status: "Closed",
                },
                { new: true }
            )
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};
export const deleteTicket = ({ _id, clientId }) => {
    return new Promise((resolve, reject) => {
        try {
            Ticket.findOneAndDelete({ _id, clientId })
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });
};
