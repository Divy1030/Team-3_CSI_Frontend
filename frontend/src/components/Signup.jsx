import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast, Toaster } from 'sonner'; // Import Toaster for toast notifications
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EyeIcon from './EyeIcon';
import './Layout.css'; // Import the CSS file

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        setPasswordError(false);
        setConfirmPasswordError(false);

        if (!validatePassword(input.password)) {
            setPasswordError(true);
            toast.error("Password must be at least 8 characters long, include letters, numbers, and a special character.");
            return;
        }

        if (input.password !== input.confirmPassword) {
            setConfirmPasswordError(true);
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('https://hola-project.onrender.com/api/auth/register/', {
              full_name: input.username,
              email: input.email,
              password: input.password
            });
      
            if (response.data.message === "User registered successfully") {
              toast.success("Signup successful!");
              setTimeout(() => {
                navigate("/"); // Redirect to login page after successful signup
              }, 1000); // Delay to allow the toast to be visible
              setInput({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
              });
            } else if (response.data.message === "User with this email is already registered.") {
              toast.error("User with this email is already registered.");
            } else {
              toast.error(response.data.message || "An error occurred during signup.");
            }
          } catch (error) {
            console.log(error.response); // Log the error response for more details
            if (error.response && error.response.data) {
              const errorMessage = error.response.data.message || "An error occurred during signup.";
              toast.error(errorMessage);
            } else {
              toast.error("Failed to connect to the server. Please try again later.");
            }
          } finally {
            setLoading(false);
          }
        }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    // Determine toast position based on screen size
    const toastPosition = window.innerWidth <= 768 ? "top-right" : "top-center";

    return (
        <div className="flex items-center justify-center bg-gradient-to-b from-grey-gradient-start to-grey-gradient-end p-4 sm:p-10 rounded-3xl">
            {/* <Toaster position={toastPosition} /> Add Toaster for toast notifications */}
            <form onSubmit={signupHandler} className="w-full max-w-md space-y-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-baloo">
                        <span className="text-purple-400">hola'</span>
                        <span className="text-white"> mi amigos</span>
                    </h1>
                </div>
                
                <Input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={changeEventHandler}
                    className="w-full bg-[#2c2c2e] text-white rounded-lg border-[#746d91] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                    placeholder="Enter your username"
                />

                <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="w-full bg-[#2c2c2e] text-white rounded-lg border-[#746d91] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                    placeholder="Enter your email"
                />

                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className={`w-full bg-[#2c2c2e] text-white rounded-lg border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white ${passwordError ? 'border-red-500' : 'border-[#746d91]'}`}
                        placeholder="Create password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                        <EyeIcon isVisible={!showPassword} toggleVisibility={togglePasswordVisibility} />
                    </div>
                </div>

                <div className="relative">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={changeEventHandler}
                        className={`w-full bg-[#2c2c2e] text-white rounded-lg border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white ${confirmPasswordError ? 'border-red-500' : 'border-[#746d91]'}`}
                        placeholder="Confirm password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                        <EyeIcon isVisible={!showConfirmPassword} toggleVisibility={toggleConfirmPasswordVisibility} />
                    </div>
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
                        'Sign up'
                    )}
                </Button>

                <div className="flex items-center">
                    <div className="flex-grow h-px bg-[#cbb3ff]"></div>
                    <span className="px-4 text-sm text-[#cbb3ff]">OR</span>
                    <div className="flex-grow h-px bg-[#cbb3ff]"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        type="button"
                        className="w-full bg-[#2c2c2e] hover:bg-gray-700 text-white rounded-lg border-[#746d91] border-[3px] transition duration-200"
                    >
                        Continue with&nbsp;<strong>G</strong>
                    </Button>
                    <Button
                        type="button"
                        className="w-full bg-[#2c2c2e] hover:bg-gray-700 text-white rounded-lg border-[#746d91] border-[3px] transition duration-200"
                    >
                        <Mail className="mr-2 h-4 w-4" />
                        Continue with
                    </Button>
                </div>

                <p className="text-center text-white">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 underline">
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;