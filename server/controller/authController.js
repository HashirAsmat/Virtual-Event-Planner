const Joi = require("joi");
const User = require("../models/user");
//const RefreshTokenModel = require('../models/refreshToken');
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/user');
const JWTService = require('../services/jwtServices');
const { NODE_ENV } = require("../config/index");
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const { oauth2client } = require("../utils/googleConfig");
//const auth = require("../middleware/authenticateUser");
const myCache = new NodeCache({ stdTTL: 600 });
const axios = require('axios');

// setup transporter for Sending Email
const transporter = nodemailer.createTransport({
    service: 'Gmail', // email service (google)
    auth: {
        user: 'hashirkhattak123@gmail.com', // Your Gmail address
        pass: 'lxby keid twmd mush' // Your Gmail App password - app name(nodeMailer) 
    }
});

const authController = {
    async signupRequest(req, res, next) {

        //user register schema
        const userRegisterSchema = Joi.object({
            username: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        // console.log("signup route hit",req.body);

        //1.validate user input
        const error = userRegisterSchema.validate(req.body).error;

        //2.if error in validation -> return error via middleware
        if (error) {
            console.log(error.details, 'this is the error i am getting');
            return next(error);
            //next will call the next middleware right below app.use(router);
        }

        //3.if email or username is already registered -> return an error
        const { username, email, password } = req.body;

        //check if email is already register
        try {
            const emailInUse = await User.exists({ email });
            const usernameInUse = await User.exists({ username });
            if (emailInUse) {
                const error = {
                    status: 409,
                    message: "Email already registered, use another email."
                };
                return next(error);
            }
            if (usernameInUse) {
                const error = {
                    status: 409,
                    message: "Username not available, use another username."
                };
                return next(error);
            }

            //4.password Hashing
            const hashedPassword = await bcrypt.hash(password, 10);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            console.log(hashedPassword, 'this is hashedPassword');


            // //5.Storing OTP and the user data in the Cache - using nodeCache package 
            myCache.set(email, { otp, username, password: hashedPassword, email });


            //6.Sending OTP in the user email provided by the user in the registration form to verify email. 
            const mailOptions = {
                from: 'hashirkhattak123@gmail.com',
                to: email,
                subject: 'Your OTP for Signup',
                text: `Your OTP for signup is ${otp}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Error sending email' });
                } else {
                    console.log('Email sent successfully:', info.response);
                    return res.status(200).json({ message: 'OTP sent to your email' });
                }
            });
        }
        catch (error) {
            console.log('this is error in the try catch block')
            return next(error);
        }
    },


    async verifyOTP(req, res, next) {
        const { otp } = req.body;
        const { email } = req.params;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Retrieving data from cache
        const cachedData = myCache.get(email);
        if (cachedData) {
            console.log(`Data retrieved from cache for email ${email}:`);
        } else {
            console.log(`No data found in cache for email ${email}`);
            return res.status(400).json({ message: 'OTP expired or not found' });
        }

        try {
            const cachedOtp = Number(cachedData.otp);
            const inputOtp = Number(otp);
            if (inputOtp === cachedOtp) {
                // Save user to the database
                const newUser = new User({ email, username: cachedData.username, password: cachedData.password });
                await newUser.save();

                // let accessToken;
                accessToken = JWTService.signAccessToken({
                    _id: newUser._id,
                }, '30m');


                //send token as cookie
                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    secure: NODE_ENV === "production",
                    httpOnly: true,//for security purpose , to prevent XSS attack
                    sameSite: "strict"
                });


                // Clean up the cache
                myCache.del(email);

                return res.status(201).json({ user: newUser, auth: true, message: "User created seccessfully" });
            } else {
                return res.status(400).json({ message: 'Invalid OTP' });
            }
        } catch (err) {
            return next(err);
        }
    },

    async logout(req, res, next) {
        //clear cookies
        res.clearCookie('accessToken');

        //send user null as response hence logout
        res.status(200).json({ user: null, auth: false, message: 'user logged out successfully' });
    },

    async login(req, res, next) {
        //user register schema
        const userRegisterSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        //1.validate user input
        const error = userRegisterSchema.validate(req.body).error;

        //2.if error in validation -> return error via middleware
        if (error) {
            return next(error);
            //next will call the next middleware right below app.use(router);
        }

        //3.if email or username is already registered -> return an error
        const { email, password } = req.body;

        //4. Match the email in Database
        const user = await User.findOne({
            email,
        })
        if (!user) {
            const error = {
                status: 401,
                message: "invalid email"
            }
            return next(error)
        }
        //5.match the password 
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const error = {
                status: 401,
                message: "invalid password"
            }
            return next(error)
        }

        //6.generate Tokens
        const accessToken = JWTService.signAccessToken({
            _id: user._id,
        }, '30m');

        //7.send token as cookie in resp
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        //8.send the response
        return res.status(200).json({ user, auth: true, message: "User Logged in seccessfully" });
    },

    async resetPasswordOtpRequest(req, res, next) {

        const { email } = req.params;
        try {
            const emailInUse = await User.exists({ email });
            if (emailInUse) {
                //Generate otp for reset password
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                // //Storing OTP and the user email in the Cache - using nodeCache package 
                myCache.set(email, { otp, email });

                //Sending OTP in the user email provided by the user 
                const mailOptions = {
                    from: 'hashirkhattak123@gmail.com',
                    to: email,
                    subject: 'Your OTP for Password Reset',
                    text: `Your OTP for Password Reset is ${otp}`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        return res.status(500).json({ message: 'Error sending email' });
                    } else {
                        console.log('Email sent successfully:', info.response);
                        return res.status(200).json({ message: 'OTP sent to your email' });
                    }
                });

            }
        }
        catch (err) {
            return next(err)
        }
    },

    async verifyResetPassOTP(req, res, next) {
        const { otp } = req.body;
        const { email } = req.params;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Retrieving data from cache
        const cachedData = myCache.get(email);
        if (cachedData) {
            console.log(`Data retrieved from cache for email ${email}:`);
        } else {
            console.log(`No data found in cache for email ${email}`);
            return res.status(400).json({ message: 'OTP expired or not found' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Invalid email" });
            }

            const cachedOtp = Number(cachedData.otp);
            const inputOtp = Number(otp);
            if (inputOtp === cachedOtp) {

                // Clean up the cache
                myCache.del(email);

                // let accessToken;
                accessToken = JWTService.signAccessToken({
                    _id: user._id,
                }, '30m');


                //send token as cookie
                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    secure: NODE_ENV === "production",
                    httpOnly: true,//for security purpose , to prevent XSS attack
                    sameSite: "strict"
                });
                // Send response indicating OTP is valid
                return res.status(200).json({
                    message: 'Reset Password OTP is valid',
                    resetOtpIsValid: true
                });

            }
            else {
                return res.status(400).json({ message: 'Invalid OTP', resetOtpIsValid: false });
            }
        } catch (err) {
            return next(err);
        }
    },

    async updatePassword(req, res, next) {
        try {
            const user = req.user; // from auth middleware
            const { password } = req.body;

            // Check if the password is provided
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }

            if (!user) {
                return res.status(401).json({ message: "Invalid user" });
            }

            // Password Hashing
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update the user's password
            await User.updateOne({ _id: user._id }, { password: hashedPassword });

            // Send a success response
            return res.status(200).json({ message: "Password updated successfully" });

        } catch (error) {
            // Log the error and send a response
            console.error("Error updating password:", error);
            return next(error);
        }
    },

    async googleLogin(req, res, next) {
        try {
            const { code } = req.query;
            const googleResp = await oauth2client.getToken(code);

            oauth2client.setCredentials(googleResp.tokens);
            const userRes = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResp.tokens.access_token}`
            );
            const { email, name } = userRes.data;
            console.log('this is email and name', email, name);
            const user = await User.findOne({
                email,
            })
            if (!user) {
                const user = await User.create({
                    username:name,
                    email
                })
                const accessToken = JWTService.signAccessToken({
                    _id: user._id,
                }, '30m');
                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                });
                return res.status(200).json({ user, auth: true, message: "User Created and Logged in seccessfully" });
            }

            //incase user is already present in database
            const accessToken = JWTService.signAccessToken({
                _id: user._id,
            }, '30m');
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });
             return res.status(200).json({ user, auth: true, message: "User Logged in seccessfully" });

        }
        catch (err) {
            // Log the error and send a response
            console.error("Error updating password:", err);
            return next(err);
        }
    },

}



module.exports = authController;



//https://youtu.be/a75PNthqQOI?si=Nt2UZrW4KhJ3Az54  (reference video for implementing Oauth2 - signup and login with google api)