import { randomPinNumber } from "../../helper/RandomGenerator.js";
import { ResetPin } from "./ResetPin.schema.js";

export const setPasswordResetPin = async (email) => {
    const pinlength = 6;
    const randPin = randomPinNumber(pinlength);
    console.log(randPin)
    const resObj = {
        email,
        pin: randPin,
    }
    return new Promise((resolve, reject) => {
        ResetPin(resObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    })
}