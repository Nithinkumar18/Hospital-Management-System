
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectionTime = require('./src/utilities/utility');
const app = express();


dotenv.config();
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