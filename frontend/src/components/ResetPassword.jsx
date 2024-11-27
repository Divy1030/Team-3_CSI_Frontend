import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator'; // Import the ProgressIndicator component

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            setLoading(true);
            // Temporarily bypass the API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Password reset successful! You can now log in.");
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error("Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center bg-gradient-to-b from-grey-gradient-start to-grey-gradient-end p-10 rounded-3xl form-container">
            <form onSubmit={resetPasswordHandler} className="w-full max-w-md space-y-4">
                <div className="mb-2">
                    <ProgressIndicator step={3} /> {/* Add the ProgressIndicator component */}
                </div>
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">
                        <span className="text-purple-400">hola'</span>
                        <span className="text-white"> mi amigos</span>
                    </h1>
                </div>
                <span className="block text-white mb-5 text-center">Reset your Password</span>
                <div className='mb-6'>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=" w-full bg-[#2c2c2e] text-white rounded-lg border-[#746d91] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                        placeholder="Enter new password"
                    />
                </div>
                <div className='mb-6'>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className=" w-full bg-[#2c2c2e] text-white rounded-lg border-[#746d91] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                        placeholder="Confirm new password"
                    />
                </div>
                <div className='mb-5'></div> {/* Add a gap between the input field and the button */}
                {
                    loading ? (
                        <Button className="w-full py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit' className="w-full py-2 bg-[#cab3fe] text-black font-bold text-lg rounded-lg hover:bg-purple-700 transition duration-200">
                            Reset Password
                        </Button>
                    )
                }
            </form>
        </div>
    );
};

export default ResetPassword;