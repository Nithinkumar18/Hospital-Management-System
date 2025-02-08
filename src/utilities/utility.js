const nodemailer = require('nodemailer');
require('dotenv').config();

const  connectionTime = () => {
    return new Date().toLocaleTimeString('en-GB',{hour: '2-digit', minute: '2-digit',second: '2-digit'});
}


const transporter = nodemailer.createTransport({
    
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth:{
        user: process.env.USER_KEY,
        pass: process.env.PASS_KEY
    },
    tls:{
        rejectUnauthorized: false
    }
})


async function sendNotification(docterName,patientEmail,patientName,appointmentDate,appointmentTime){

   
    const msg_info =  await transporter.sendMail({
        from: '"Wellness Hospitals 🩺" <nithinvooturi93@gmail.com>',
        to: `${patientEmail}`,
        subject: "Appointment Details 🕰️",
        text: "Hi User",
        html: `Hi Mr/Mrs ${patientName} <br/>
               <p>This mail is regarding for your upcoming appointment with Dr ${docterName}
               scheduled on ${appointmentDate}  at  ${appointmentTime}.</br></br>
               We look forward to seeing you and assisting with your healthcare needs.
               If you have any questions or  need to reschedule, please contact
               our  customer support at  supportwellness@gmail.com <br/> <br/>
                Thanks<br/>
               Wellness Hospitals`
    });
    
    console.log('appointment notification sent',msg_info.messageId);
}


module.exports = { connectionTime,sendNotification}
