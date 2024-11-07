const express = require("express");
const app = express();
const cors = require('cors');
const {PORT} = require("./config/index");
const chalk = require('chalk');

const DB_connection = require("./Database/index");
const router = require("./routes/index");
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add OPTIONS method
    allowedHeaders: ['Content-Type', 'Authorization'],    // Allow necessary headers
};
//middlewares 
app.use(cookieParser());
app.use(express.json({limit:'50mb'}));
app.use(cors(corsOptions));

//DB connection
 DB_connection();


//route handler
app.use(router);  

//Handling Error
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(chalk.blue.bold(`listening on ${PORT}`));
})