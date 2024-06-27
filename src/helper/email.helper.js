import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'daisy.vandervort78@ethereal.email',
        pass: 'fVJHA47SEBgygEhk9V'
    }
});
const send = async (info) => {
    const infor = await transporter.sendMail(info);
    console.log("Message sent: %s", infor.messageId);
}
export const emailProcessor = async (email, pin, type) => {

    let info = ''
    switch (type) {
        case 'request-new-password':
            info = {
                from: '" Mayank CRM "malika.effertz42@ethereal.email', // sender address
                to: email, // list of receivers
                subject: "Password reset pin", // Subject line
                text: `"Here is your reset pin to change you password" = ${pin}`, // plain text body
                html: `<b>
            ${pin}
            </b>`, // html body
            }
            send(info)
            break;
        case 'update-password-success':
            info = {
                from: '" Mayank CRM "malika.effertz42@ethereal.email', // sender address
                to: email, // list of receivers
                subject: "Password reset pin", // Subject line
                text: `Your new password has been updated`, // plain text body
                html: `<b>
                Your new password has been updated
                    </b>`, // html body
            }
            send(info)

            break;
        default:
            break;
    }


}
