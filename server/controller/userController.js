const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/user');
// const JWTService = require('../services/jwtServices');
// const { NODE_ENV } = require("../config/index");



const userController = {
    async getAllUsers(req, res, next) {

        try {
            const allUsers = await User.find();

            if (allUsers) {
                return res.status(201).json({ All_Users: allUsers, message: "These are all the users from DataBase" });
            }
        }
        catch (err) {

            return next(err);
        }

    },


    //**** Infinity load controller *****
    async getAllUsersInfinity(req, res, next) {
        const { pageSize, lastId } = req.params; // Accessing route parameters via req.params
        try {
            let query = {};

            // Check if lastId is valid and provided
            if (lastId && lastId !== 'null' && lastId !== 'undefined' && lastId !== ':lastId') {
                query._id = { $gt: lastId }; // Fetch users with _id greater than lastId
            }

            // Fetch the next batch of users, plus one extra to check for "hasMore"
            const users = await User.find(query)
                .sort({ _id: 1 }) // Sort by _id to ensure consistent order
                .limit(Number(pageSize) + 1); // Fetch one more than pageSize

            const hasMore = users.length > Number(pageSize); // Determine if more users exist
    
            if (hasMore) {
                users.pop(); // Remove the extra user from the result
            }

            const totalUsers = await User.countDocuments(); // Optional: For metadata

            // Send response with users and pagination info
            res.status(200).json({
                users, // Return the correct batch of users
                totalUsers,
                hasMore, // Indicates if more users are available
                lastId: users.length > 0 ? users[users.length - 1]._id : null, // Pass last user's _id
                message: "Users fetched successfully",
            });
        } catch (err) {
            next(err);
        }
    }

    
};






module.exports = userController;
