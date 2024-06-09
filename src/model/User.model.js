import { User } from "./User.schema.js";

export const insertUser = (userObj) => {
    return new Promise((res, rej) => {
        User(userObj)
            .save()
            .then((data) => res(data))
            .catch((error) => console.log(error));
    });
}
export const getUserById = async (_id) => {
    try {
        const user = await User.findOne(_id)
        if (!user) return res.json({ status: "error", message: "forbidden" })
        return user;

    } catch (error) {
        return error
    }
};
export const storeUserRefreshToken = async (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            User.findOneAndUpdate(
                { _id },
                {
                    $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
                },
                { new: true }).then((data) => resolve(data))
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    })
};

