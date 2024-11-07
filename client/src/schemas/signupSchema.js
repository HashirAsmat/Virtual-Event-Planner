import * as yup from 'yup';
const passwordPattern =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
const errorMessage =
    "your password must contain atleast one uppercase, one lowercase ,one special character and one digit";
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailError = 'please enter a valid email';

const signupSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required("username is required"),
    password: yup
        .string()
        .min(6)
        .max(25)
        .matches(passwordPattern, { message: errorMessage })
        .required("password is required"),
    email: yup
        .string()
        .min(4)
        .max(50)
        .matches(emailPattern, { message: emailError })
        .required("email is required"),
});

export default signupSchema;