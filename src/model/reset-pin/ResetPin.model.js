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

export const getPinByEmail = (email, pin) => {
    const find = ResetPin.findOne({ email, pin })
    return find;
}
export const deletePin = (email, pin) => {
    try {
        ResetPinSchema.findOneAndDelete({ email, pin }, (error, data) => {
            if (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
};