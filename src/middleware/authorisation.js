import { verifyAccessJWT } from "../helper/jwt.js";
import { User } from "../model/User.schema.js";

export const userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;
    // console.log({ authorization });

    const decodeToken = verifyAccessJWT(authorization);
    if (!decodeToken) {
        return res.status(403).json({ message: "forbidden" });
    }
    const userid = User.findById(decodeToken._id)
    if (!userid) {
        return res.status(403).json({ message: "forbidden" });
    }
    // console.log(userid)

    // console.log(decodeToken)
    req.userId = userid;

    return next();
};
