// const {ValidationError} = require('joi');


// const errorHandler = (error,req,res,next)=>{
// //default error
// let status = 500;
// let data = {
//     message:"internal server Error"
// }

// //check if error is validation error
// if(error instanceof ValidationError){
//     status = 401;
//     data.message = error.message;
//     return res.status(status).json(data)

// }

// //if error is other than validation Error
// if(error.status){
//     data.status = error.status;
// }  
// if(error.message){
//     data.message = error.message;
// }
// return res.status(status).json(data);
// }

// module.exports = errorHandler;

const { ValidationError } = require('joi');

const errorHandler = (error, req, res, next) => {
    // Default error response
    let status = error.status || 500;
    let data = {
        message: "Internal Server Error", // Default message
        ...(error.data && { data: error.data }) // Attach any additional data if available
    };

    // Check if the error is a validation error from Joi
    if (error instanceof ValidationError) {
        status = 400;  // Bad request
        data.message = error.message;
    }

    // Custom errors from the controller should include a `status` and `message`
    if (error.status && error.message) {
        status = error.status;  // Use the status passed from the controller
        data.message = error.message;  // Use the message passed from the controller
    }

    // Return the formatted error response
    return res.status(status).json(data);
};

module.exports = errorHandler;
