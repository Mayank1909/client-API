import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'malika.effertz42@ethereal.email',
        pass: 'XJZwJn7FCqpb4Mt523'
    }
});
const send = async (info) => {
    const infor = await transporter.sendMail(info);
    console.log("Message sent: %s", infor.messageId);
}
export const emailProcessor = async (email, pin) => {
    const info = {
        from: '" Mayank CRM "malika.effertz42@ethereal.email', // sender address
        to: email, // list of receivers
        subject: "Password reset pin", // Subject line
        text: `"Here is your reset pin to change you password" = ${pin}`, // plain text body
        html: `<b>
        ${pin}
        </b>`, // html body
    }
    send(info)
}
