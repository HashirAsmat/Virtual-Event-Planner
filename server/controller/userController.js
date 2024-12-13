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
    
    
        //**** Infinity load controller *****
    // async getAllUsers(req, res, next) {
    //     const { page, pageSize, lastId } = req.params; // Accessing route parameters via req.params
        
    //     try {
    //         let query = {};
    
    //         // Check if lastId is provided (pagination logic)
    //         if (lastId) {
    //             query._id = { $gt: lastId }; // Fetch users with _id greater than lastId
    //         }
    
    //         // Fetch the next batch of users
    //         const users = await User.find(query)
    //             .sort({ _id: 1 }) // Sort by _id to ensure consistent order
    //             .limit(Number(pageSize));
    
    //         const totalUsers = await User.countDocuments(); // Optional: For metadata
    
    //         // Send response with users and pagination info
    //         res.status(200).json({
    //             users,
    //             totalUsers,
    //             hasMore: users.length === Number(pageSize), // Indicates if more users are available
    //             lastId: users.length > 0 ? users[users.length - 1]._id : null, // Pass last user's _id
    //             message: "Users fetched successfully",
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    


    };
    
    




module.exports = userController;
