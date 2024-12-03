import * as yup from 'yup';
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailError = 'please enter a valid email';

const loginSchema = yup.object().shape({
    email: yup
    .string()
    .min(4)
    .max(50)
    .matches(emailPattern, { message: emailError })
    .required("email is required"),
    password: yup
        .string()
        .required("password is required"),
  
});

export default loginSchema;