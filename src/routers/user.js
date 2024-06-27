import { Router } from 'express'
import { getUserByEmail, getUserById, insertUser, storeUserRefreshToken, updatePassword } from '../model/User.model.js';
import { User } from '../model/User.schema.js';

import { hashPassword, comparepassword } from '../helper/hashPassword.js';
import { createJWT, refreshJWT } from '../helper/jwt.js';
import { userAuthorization } from '../middleware/authorisation.js';
import { deletePin, getPinByEmail, setPasswordResetPin } from '../model/reset-pin/ResetPin.model.js';
import { emailProcessor } from '../helper/email.helper.js';



const router = Router();

router.all("/", (req, res, next) => {

    next();
})

router.get("/", userAuthorization, async (req, res) => {

    const _id = req.userid;
    const userProfile = await getUserById(_id);
    // const { name, email } = userProfile;
    res.json({
        user: {
            userProfile

        }
    })
    // res.json({ user })
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
    const accessjwt = await createJWT(user.email, user._id);
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

// reset password
// 1. recieve mail
// 2. check if user exist for the email



// Update password
// 1. recive email pin and new password
// 2. validate the pin 
// 3. encrypt the new password 
// 4. update in databse
// 5. send email notification 

// serverside validation
router.post("/reset-password", async (req, res) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user && user._id) {
        // 3. if exist create a unique 6 digit code 
        // 4. save pin and email in databse

        // res.json("hello")
        const resetPin = await setPasswordResetPin(email);
        console.log(resetPin)

        const result = await emailProcessor(email, resetPin.pin, "request-new-password",)

        if (result) {
            console.log("mail sent")
            return res.status(200).json({ message: "mail sent", id: messageId })
        }

    }
    // res.status(403).json({ message: "If the email is exist in our database, the password reset pin will be sent shortly" })
})

router.patch("/reset-password", async (req, res) => {
    const { email, newpassword, pin } = req.body;
    const getPin = await getPinByEmail(email, pin)
    if (getPin?._id) {
        const dbDate = getPin.addedAt;
        const expiresIn = 1;

        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);

        const today = new Date();

        if (today > expDate) {
            return res.json({ status: "error", message: "Invalid or expired pin." });
        }

        // encrypt new password
        const hashedPass = await hashPassword(newpassword);

        const user = await updatePassword(email, hashedPass);

        if (user._id) {
            // send email notification
            await emailProcessor({ email, type: "update-password-success" });

            ////delete pin from db
            deletePin(email, pin);

            return res.json({
                status: "success",
                message: "Your password has been updated",
            });
        }
    }
    res.json({
        status: "error",
        message: "Unable to update your password. plz try again later",
    });
    res.json({ getPin });
})


router.delete("/logout", userAuthorization, async (req, res) => {
    const { authorization } = req.headers;

    const _id = req.userId
    // res.json({ message: authorization })
    // console.log(_id);

    const result = await storeUserRefreshToken(_id, "");
    if (result._id) {

        return res.json({ status: "success", message: "logged out successfully" })
    }
    res.json({
        status: "error",
        message: "Unable to logg you out, plz try again later",
    });


})

export default router;