import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import axios from 'axios';
import EyeAnimation from './EyeAnimation'; // Import the EyeAnimation component

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('https://47df-2405-204-1287-fbe7-f923-7e02-f974-1f96.ngrok-free.app/api/auth/login/', {
                email: input.email,
                password: input.password
            });
            if (response.data.access) {
                // Store the access token in local storage
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);

                // Fetch user profile data
                const profileResponse = await axios.get('https://47df-2405-204-1287-fbe7-f923-7e02-f974-1f96.ngrok-free.app/api/auth/user-profile/', {
                    headers: {
                        'Authorization': `Bearer ${response.data.access}`
                    }
                });

                // Set the authenticated user
                dispatch(setAuthUser(profileResponse.data.user));

                toast.success("Login successful!");
                navigate("/"); // Navigate to the home page
            } else {
                toast.error(response.data.message || "Login failed!");
            }
        } catch (error) {
            if (!navigator.onLine) {
                toast.error("No internet connection. Please check your network settings.");
            } else if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Login failed! Please try again.");
            }
            console.log(error.response); // Log the error response for more details
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="flex items-center justify-center bg-gradient-to-b from-grey-gradient-start to-grey-gradient-end p-10 rounded-3xl form-container">
            <form onSubmit={loginHandler} className="w-full max-w-md space-y-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
                        <span className="text-purple-400">hola'</span>
                        <span className="text-white"> mi amigos</span>
                    </h1>
                </div>
                
                <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="w-full bg-[#2c2c2e] text-white rounded-lg border-[#cab3fe] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                    placeholder="Enter your email"
                />

                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="w-full bg-[#2c2c2e] text-white rounded-lg border-[#cab3fe] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                        placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                        <EyeAnimation isVisible={showPassword} />
                    </div>
                </div>

                <div className='text-right mt-2'>
                    <Link to="/forgot-password" className='text-sm text-orange-400 hover:underline'>
                        Forgot Password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-[#cab3fe] hover:bg-purple-500 text-black font-bold rounded-lg border-[#746d91] border-[2px] transition duration-200"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </div>
                    ) : (
                        'Login'
                    )}
                </Button>

                <div className="flex items-center">
                    <div className="flex-grow h-px bg-gray-700"></div>
                    <span className="px-4 text-sm text-gray-400">OR</span>
                    <div className="flex-grow h-px bg-gray-700"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        type="button"
                        className="w-full bg-[#2c2c2e] hover:bg-gray-700 text-white rounded-lg border-[#cab3fe] border-[3px] transition duration-200"
                    >
                        Login with Google
                    </Button>
                    <Button
                        type="button"
                        className="w-full bg-[#2c2c2e] hover:bg-gray-700 text-white rounded-lg border-[#cab3fe] border-[3px] transition duration-200"
                    >
                        Login with SMS
                    </Button>
                </div>

                <p className="text-center text-white">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-purple-400 hover:text-purple-300 underline">
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;