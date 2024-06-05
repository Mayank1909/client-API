import { Router } from 'express'
import { insertUser } from '../model/User.model.js';
import { User } from '../model/User.schema.js';

import { hashPassword, comparepassword } from '../helper/hashPassword.js';
import { createJWT, refreshJWT } from '../helper/jwt.js';

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

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        console.log("error")
        res.json({ status: "error", message: "please enter all crendentials" })
    }
    const user = await User.findOne({
        $or: [{ email }]
    })
    // if (!user) {
    //     res.json("User does not exist ")
    // }
    const passfromDb = user && user._id ? user.password : null;

    if (!passfromDb) {
        return res.json({ status: "error", message: "credentials does not match" });
    }


    const result = await comparepassword(password, passfromDb)
    console.log(result)
    if (!result) {
        return res.json({ status: "error", message: "credentials does not match" });
    }
    //creating tokens
    const accessjwt = await createJWT(user.email);
    const refreshjwt = await refreshJWT(user.email, user._id);


    // res.json({ status: "success", message: "Login Succesfully", accessjwt, refreshjwt })
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessjwt, options).cookie("refershToken", refreshjwt, options).json(
        {
            status: "200",
            user, accessjwt, refreshjwt
            , message: "User logged in successfully"
        }
    )
})


export default router;