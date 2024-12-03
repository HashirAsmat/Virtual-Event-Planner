import { FaGoogle } from 'react-icons/fa';
import eventiumLogo from '../assets/eventium1.png';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from '../state/userAuthSlice';
import { login } from "../../api/internal";
import loginSchema from "../schemas/login";
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from '../../api/internal';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { values, touched, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
    });

    async function handleLogin(event) {
        event.preventDefault();

        const data = {
            email: values.email,
            password: values.password
        };

        try {
            setIsLoading(true);
            const response = await login(data);

            if (response.status === 200) {
                const user = {
                    _id: response.data.user._id,
                    email: response.data.user.email,
                    username: response.data.user.username,
                    isAuth: response.data.auth
                };
                dispatch(setUser(user));
                navigate("/home");
            } else if (response.status === 409) {
                setError(response.message || 'Conflict error occurred');
            } else if (response.code === 'ERR_BAD_REQUEST') {
                setError(response.response?.data?.errorMessage || 'Bad request error occurred');
            } else {
                setError(`error: ${response.message}`);
            }
        } catch (error) {
            console.log('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const responseGoolge = async (authResult) => {
        try {
           if(authResult['code']){
             //console.log(authResult['code']);
             const response = await googleAuth(authResult['code']);
             console.log('this is result from backend google api ',response);
                //  const user = {
				// 	_id:response.data.user._id,
				// 	email:response.data.user.email,
				// 	username:response.data.user.username,
				// 	isAuth:response.data.auth
				// }
				// dispatch(setUser(user));
				// toast.success("login successfully");
				// navigate("/home");
           }
        }

        catch (error) {
            console.log('error while requesting google code:', error);
        }
    }


    const googleLogin = useGoogleLogin({
        onSuccess: responseGoolge,
        onError: responseGoolge,
        flow: ''
    })

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <div className="text-center mb-4">
                    <img
                        src={eventiumLogo}
                        alt="Eventium"
                        style={{ height: '90px', width: 'auto', margin: '0 auto' }}
                    />
                    <p className="text-gray-600 font-semibold">Login to continue</p>
                </div>
                <div className="flex justify-center gap-8 mb-4">
                    <button className="flex items-center justify-center w-[60px] h-[60px] bg-[#2563EB] text-white rounded-lg shadow-md hover:bg-[#729cf8]">
                        <FaGoogle size={30} onClick={googleLogin} />
                    </button>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <span className="border-t border-gray-300 flex-grow"></span>
                    <span className="px-4 text-gray-700 font-semibold">or</span>
                    <span className="border-t border-gray-300 flex-grow"></span>
                </div>
                <form className="space-y-4" onSubmit={handleLogin}>
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
                                handleChange(e);
                                setError('');
                            }}
                            autoComplete='email'
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
                            onChange={(e) => {
                                handleChange(e);
                                setError('');
                            }}
                            autoComplete="current-password"
                        />
                        {errors.password && touched.password ? <p className="text-red-500">{errors.password}</p> : null}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#AF34AF] text-white py-2 rounded-lg hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    {error && (
                        <p className="text-red-500 text-center mt-2">
                            {error}
                        </p>
                    )}
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don`t have an account?{' '}
                        <Link to="/signup" className="text-[#AF34AF] font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
