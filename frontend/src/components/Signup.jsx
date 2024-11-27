import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EyeAnimation from './EyeAnimation';

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

    const signupHandler = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirmPassword) {
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
            if (response.data.success) {
                toast.success("Signup successful!");
                navigate("/login"); // Redirect to login page after successful signup
                setInput({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
            } else {
                toast.error(response.data.message || "Signup failed!");
            }
        } catch (error) {
            console.log(error.response); // Log the error response for more details
            toast.error("Signup failed! Please try again.");
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
        <div className="flex items-center justify-center bg-gradient-to-b from-grey-gradient-start to-grey-gradient-end p-10 rounded-3xl">
            <form onSubmit={signupHandler} className="w-full max-w-md space-y-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
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
                        className="w-full bg-[#2c2c2e] text-white rounded-lg border-[#746d91] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                        placeholder="Create password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                        <EyeAnimation isVisible={showPassword} />
                    </div>
                </div>

                <div className="relative">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={changeEventHandler}
                        className="w-full bg-[#2c2c2e] text-white rounded-lg border-[#746d91] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                        placeholder="Confirm password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                        <EyeAnimation isVisible={showConfirmPassword} />
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
                    <div className="flex-grow h-px bg-gray-700"></div>
                    <span className="px-4 text-sm text-gray-400">OR</span>
                    <div className="flex-grow h-px bg-gray-700"></div>
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