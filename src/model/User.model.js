import { User } from "./User.schema.js";

const insertUser = (userObj) => {
    return new Promise((res, rej) => {
        User(userObj)
            .save()
            .then((data) => res(data))
            .catch((error) => console.log(error));
    });
}

export default insertUser;
