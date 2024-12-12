const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/user');
// const JWTService = require('../services/jwtServices');
// const { NODE_ENV } = require("../config/index");



const userController = {
    async getAllUsers(req, res, next) {

        try{
            const allUsers = await User.find();
            
            if(allUsers){
                return res.status(201).json({ All_Users: allUsers, message: "These are all the users from DataBase" });
            }
        }
        catch(err){
        
            return next(err);
        }
       
    },
    
}



module.exports = userController;
