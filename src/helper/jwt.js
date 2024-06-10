import jwt from 'jsonwebtoken'
import { storeUserRefreshToken } from '../model/User.model.js';
// import { getJWT, setJWT } from './redis.js';


export const createJWT = async (email, _id) => {
    const payload = {
        _id: _id,
        email: email,
        // Include any other fields you need
    };
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '1m' });
};
export const refreshJWT = async (email, _id) => {
    const refreshjwt = jwt.sign({ email }, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "30d",
    })
    await storeUserRefreshToken(_id, refreshjwt);

    return Promise.resolve(refreshjwt)
}
export const verifyAccessJWT = (userJWT) => {
    try {
        return jwt.verify(userJWT, process.env.JWT_ACCESS_TOKEN);
    } catch (error) {
        console.error('JWT verification error:', error);
        return null;
    }
};
export const verifyRefreshJWT = (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_TOKEN));
    } catch (error) {
        return Promise.resolve(error);
    }
};
