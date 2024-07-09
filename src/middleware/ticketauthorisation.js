import { verifyAccessJWT } from "../helper/jwt.js";
import { getUserByEmail, getUserById } from "../model/User.model.js";
import { User } from "../model/User.schema.js";

export const ticketAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;
    // console.log({ authorization });

    const decodeToken = verifyAccessJWT(authorization);
    if (!decodeToken) {
        return res.status(403).json({ message: "forbidden" });
    }
    if (decodeToken.email) {
        console.log(decodeToken)
        const userid = decodeToken._id;
        if (!userid) {
            return res.status(403).json({ message: "forbidden" });
        }
        // console.log(userid)

        // console.log(decodeToken)
        req.userId = userid;

        return next();
    }
};
