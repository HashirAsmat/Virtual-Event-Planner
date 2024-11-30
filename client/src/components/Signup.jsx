import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import eventiumLogo from '../assets/eventium1.png';
import { useState } from 'react';
import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';
 import { useNavigate } from 'react-router-dom';
import signupSchema from '../schemas/signupSchema';
//import { setUser } from '../state/userAuthSlice';
import { signup } from '../../api/internal';


const SignUp = () => {
   const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [OTPstatus, setOTPstatus] = useState('');

  async function handleSignup(event) {
    event.preventDefault();

    const data = {
      username: values.username,
      email: values.email,
      password: values.password
    };

   // console.log('This is handleSignup Data:', data);

    try {
      const response = await signup(data);

      if (response.status === 200) { 
        setOTPstatus(response.data.message);
         // Redirect to verify OTP pages
        navigate(`/emailVerificationPage/${values.email}`);
      }

      else if (response.status === 409) { // Handle conflict errors
        setError(response.message || 'Conflict error occurred'); // Show conflict error message
      } else if (response.code === 'ERR_BAD_REQUEST') {
        setError(response.response?.data?.errorMessage || 'Bad request error occurred'); // Set error from the API
      } else {
        setError(`error: ${response.message}`); // Fallback for other errors
      }
    } catch (error) {
      console.log('Error during signup:', error);
      setError('An error occurred during signup. Please try again.'); // Set generic error message
    }
  }

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: signupSchema
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-4">
          <img
            src={eventiumLogo}
            alt="Eventium"
            style={{ height: '90px', width: 'auto', margin: '0 auto' }}
          />
          <p className="text-gray-600 font-semibold">Sign up to continue</p>
        </div>
        <div className="flex justify-center gap-8 mb-4">
          <button className="flex items-center justify-center w-[60px] h-[60px] bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
            <FaFacebookF size={30} />
          </button>
          <button className="flex items-center justify-center w-[60px] h-[60px] bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700">
            <FaGoogle size={30} />
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="border-t border-gray-300 flex-grow"></span>
          <span className="px-4 text-gray-700 font-semibold">or</span>
          <span className="border-t border-gray-300 flex-grow"></span>
        </div>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-gray-500 text-start ml-1 font-semibold">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Username"
              name="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e); // Call formik's handleChange to update form values
                setError(''); // Clear the error when the input changes
                setOTPstatus('');
              }}
            />
            {errors.username && touched.username ? <p className="text-red-500">{errors.username}</p> : null}
          </div>
          <div>
            <label className="block text-gray-500 text-start ml-1 font-semibold">Email address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Email address"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e); // Call formik's handleChange to update form values
                setError(''); // Clear the error when the input changes
                setOTPstatus('');
              }}
            />
            {errors.email && touched.email ? <p className="text-red-500">{errors.email}</p> : null}
          </div>
          <div>
            <label className="block text-gray-500 text-start ml-1 font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="new-password" 
            />
            {errors.password && touched.password ? <p className="text-red-500">{errors.password}</p> : null}
          </div>
          <button
            type="submit"
            className="w-full bg-[#AF34AF] text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Continue
          </button>
          {error ? (
            <p style={{ color: 'red', fontFamily: 'sans-serif', marginTop: '10px' }}>
              {error}
            </p>
          ) : OTPstatus && (
            <p style={{ color: 'green', fontFamily: 'sans-serif', marginTop: '10px' }}>
              {OTPstatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
