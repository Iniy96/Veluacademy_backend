import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from "dotenv"

dotenv.config()

const ETHNREAL_EMAIL = process.env.ETHNREAL_EMAIL
const ETHREAL_PASSWORD = process.env.ETHREAL_PASSWORD




let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iniyavansivaraj07@gmail.com',
    pass: 'qtazptogjxfkwigc'
  }
});


export const sendPasswordResetMail = async (recepientEmail, link ) => {

    var mailOptions = {
      from: 'iniyavansivaraj07@gmail.com',
      to: recepientEmail,
      subject: 'Velu Academy : Reset your password ',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>CodePen - OTP Email Template</title>
      </head>
      <body>
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Velu Academy</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Velu Academy. Use the following link to complete your Password Recovery Procedure. Link is valid for 15 minutes. If the link is not clickable, please copy and paste the link in your browser.</p>
            <p style="margin: 0 auto;width: max-content;padding: 0 10px;">${link}</p>
            <p style="font-size:0.9em;">Regards,<br />Velu Academy</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>VeluAcademy</p>
    
              <p>Tamil Nadu</p>
            </div>
          </div>
        </div>
      </body>
      </html>`
    };

    // let message = {
    //     from: ETHNREAL_EMAIL,
    //     to: recepientEmail,
    //     subject: "Reset password from Velu Academy",
        // html: `<!DOCTYPE html>
        // <html lang="en">
        // <head>
        //   <meta charset="UTF-8">
        //   <title>CodePen - OTP Email Template</title>
        // </head>
        // <body>
        //   <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        //     <div style="margin:50px auto;width:70%;padding:20px 0">
        //       <div style="border-bottom:1px solid #eee">
        //         <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Velu Academy</a>
        //       </div>
        //       <p style="font-size:1.1em">Hi,</p>
        //       <p>Thank you for choosing Velu Academy. Use the following link to complete your Password Recovery Procedure. Link is valid for 15 minutes. If the link is not clickable, please copy and paste the link in your browser.</p>
        //       <p style="margin: 0 auto;width: max-content;padding: 0 10px;">${link}</p>
        //       <p style="font-size:0.9em;">Regards,<br />Velu Academy</p>
        //       <hr style="border:none;border-top:1px solid #eee" />
        //       <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        //         <p>VeluAcademy</p>
      
        //         <p>Tamil Nadu</p>
        //       </div>
        //     </div>
        //   </div>
        // </body>
        // </html>`,
    // }

    // send mail
    try {
        const mailedresult = await transporter.sendMail(mailOptions)
        return mailedresult
    } catch (error) {
        return error
    }

    // .then(() => {
    //     return res.status(200).send({ msg: "You should receive an email from us."})
    // })
    // .catch(error => res.status(500).send({ error }))

}