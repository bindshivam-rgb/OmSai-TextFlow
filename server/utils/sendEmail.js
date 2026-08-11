const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    const { data, error } = await resend.emails.send({
        from: "OmSai-TextFlow <onboarding@resend.dev>",
        to: [options.email],
        subject: options.subject,
        text: options.message
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

module.exports = sendEmail;
















// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     family: 4,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });
// const sendEmail = async (options) => {
//  await transporter.sendMail({
//     from: process.env.EMAIL_USER,

//     to: options.email,

//     subject: options.subject,

//     text: options.message
// });
// }
// module.exports = sendEmail;