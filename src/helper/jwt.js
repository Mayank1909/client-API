import jwt from 'jsonwebtoken'
import { storeUserRefreshToken } from '../model/User.model.js';


export const createJWT = (payload) => {
    const accessjwt = jwt.sign({ payload }, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "15m",
    });

    return Promise.resolve(accessjwt)
}
export const refreshJWT = async (email, _id) => {
    const refreshjwt = jwt.sign({ email }, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "15m",
    })
    await storeUserRefreshToken(_id, refreshjwt);

    return Promise.resolve(refreshjwt)
}
