import nodemailer from "nodemailer";
 
// Create a transporter object using SMTP
const sendEmail = async (email,subject, text) => {
    console.log( "text : ", text )
    let transporter = nodemailer.createTransport({
         service: 'gmail',
        auth: {
            user: "kavipriya2912002@gmail.com",
            pass: 'wtipdelrgbpoxmeg'
        }
 
    });
 
    // Define email options
    let mailOptions = {
        from: "kavipriya2912002@gmail.com",
        to: email,
        subject: subject,
        text: text
    };
 
    try {
        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error occurred: ', error);
    }
}
 
export default sendEmail;