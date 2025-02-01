
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectionTime = require('./src/utilities/utility');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');


dotenv.config();

app.use(express.json());
app.use('/user/api',userRoutes);
app.use('/patient/api',patientRoutes);
app.use('/doctor/api',doctorRoutes);
app.use('/appointment/api',appointmentRoutes);
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    app.listen(process.env.PORT);
    console.log(`HMS Application started on PORT ${process.env.PORT}` + "  "+ connectionTime.connectionTime());
}).catch((err) => {
    console.log("Error establishing connection to Database");
    console.log(err);
})