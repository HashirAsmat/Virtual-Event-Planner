const mongoose = require('mongoose');
const {MONGODB_CONNECTION_STRING} = require('../config/index');
const chalk = require('chalk');

const ConnectionDB = async ()=>{
try{
const DB_connect = await mongoose.connect(MONGODB_CONNECTION_STRING);
console.log(chalk.magenta(`Database Connected: ${DB_connect.connections[0].name}`));
}
catch(err){
console.log(err);
}
}

module.exports = ConnectionDB;