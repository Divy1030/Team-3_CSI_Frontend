import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const requestOtpHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Temporarily bypass the API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("OTP sent to your email!");
            navigate('/verify-otp', { state: { email } });
        } catch (error) {
            console.log(error);
            toast.error("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center bg-gradient-to-b from-grey-gradient-start to-grey-gradient-end p-20 rounded-3xl form-container">
            <form onSubmit={requestOtpHandler} className="w-full max-w-md space-y-4">
                <div className="mb-6">
                    <ProgressIndicator step={1} />
                </div>
                <div className='mb-6 text-center'>
                    <h1 className="text-3xl font-bold">
                        <span className="text-purple-400">hola'</span>
                        <span className="text-white"> mi amigos</span>
                    </h1>
                </div>
                <div className='mb-6'>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-10 w-full bg-[#2c2c2e] text-white rounded-lg border-[#746d91] border-[2px] focus:ring-1 focus:ring-purple-400 placeholder:text-white"
                        placeholder="Enter your email"
                    />
                </div>
                <div className='mb-10'></div>
                {
                    loading ? (
                        <Button className="w-full py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit' className="w-full py-2 bg-[#cab3fe] text-black font-bold text-lg rounded-lg hover:bg-purple-700 transition duration-200">
                            Send OTP
                        </Button>
                    )
                }
            </form>
        </div>
    );
}

export default ForgotPassword;