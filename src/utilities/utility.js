const nodemailer = require('nodemailer');
const axios = require('axios');
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

    // const appointmentInfo = {docterName,patientEmail,patientName,appointmentDate,appointmentTime};
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
    // const api_key = process.env.API_KEY;
    // const url = "https://my.brevo.com/template/lCDNaspqQiLoG7lo6pRbyt3uL77kndXpkx7cfoJxGzsKI3sg.G0IbcDh";
    //  console.log(docterName,patientEmail,appointmentDate,appointmentTime);
    // const emailData = {
    //     sender: {name: "Wellness Hospitals 🩺", email: "nithinvooturi93@gmail.com"},
    //     to: {email:patientEmail},
    //     templateId: 1,
    //     params:{
    //         doctor:docterName,
    //         time: appointmentTime,
    //         date: appointmentDate
    //     }
    // }
    // try{
    //    const response = await axios.post(url,emailData,{
    //      headers:{ 
    //         "Content-Type": "application/json",
    //          "api-key": api_key
    //      }
    //    })
    //    console.log("Email has sent successfully",response.data.messageId);
    // }
    // catch(err){
    //    console.log("Failed to sent email",err)
    // }

    console.log('appointment notification sent',msg_info.messageId);
}


module.exports = { connectionTime,sendNotification}