import { Router } from 'express'
import insertUser from '../model/User.model.js';
import { User } from '../model/User.schema.js';

import hashPassword from '../helper/hashPassword.js';

const router = Router();

router.all("/", (req, res, next) => {

    next();
})

router.post("/", async (req, res, next) => {
    const { name, company, address, email, password, phone } = req.body;
    const existedUser = await User.findOne({
        $or: [{ email }]
    })
    if (existedUser) {
        res.json({ message: "user already exist" })
    }
    try {
        // hash password
        console.log(password)
        const hashedpassword = await hashPassword(password)
        const newObj = {
            name,
            company,
            address,
            email,
            phone,
            password: hashedpassword
        }
        // let user = await User.findOne({
        //     $or: [{ email }]
        // });

        const result = await insertUser(newObj)
        console.log(result);
        res.json({ message: 'New user created', result })

    } catch (error) {
        console.log(error);
        res.json({ status: "404", message: error.message })
    }
    // res.json({ message: "return form user router" })

})


export default router;