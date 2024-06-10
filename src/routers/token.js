import { Router } from 'express'
import { verifyRefreshJWT, createJWT } from '../helper/jwt.js';
import { decode } from 'jsonwebtoken';
import { getUserByEmail, getUserById } from '../model/User.model.js';
import { User } from '../model/User.schema.js';
import { token } from 'morgan';
const router = Router()


const tokensRouter = router.all("/", async (req, res, next) => {
    const { authorization } = req.headers;
    // 1. make sure if tehe token is valid
    const decoded = await verifyRefreshJWT(authorization)
    console.log(decoded)

    if (decoded.email) {
        // 2. check if the jwt is exist in database 

        const userinfo = await getUserByEmail(decoded.email)


        if (userinfo._id) {
            let tokenEXP = userinfo.refreshJWT.addedAt;;
            tokenEXP = tokenEXP.setDate(tokenEXP.getDate() + +process.env.JWT_EXPIRE_SECRET_DAY)
            console.log(new Date(tokenEXP));
            const dBrefreshToken = userinfo.refreshJWT.token;
            const today = new Date();
            if (dBrefreshToken !== authorization && tokenEXP < today) {
                return res.status(403).json({ message: "forbidden" })
            }

            const accessjwt = await createJWT(decoded.email, userinfo._id)

            return res.status(200).json(accessjwt)
        }
    }


    // 3. check if is not expired
    return res.status(403).json({ message: "forbidden" })
})
export default tokensRouter;