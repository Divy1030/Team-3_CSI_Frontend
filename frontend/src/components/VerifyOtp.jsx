import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import ProgressIndicator from './ProgressIndicator';

const VerifyOtp = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

       
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "") {
                if (e.target.previousSibling) {
                    e.target.previousSibling.focus();
                }
            } else {
                setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
            }
        }
    };

    const verifyOtpHandler = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        try {
            setLoading(true);
            // Temporarily bypass the API call
            // await axios.post('https://your-api-url.com/verify-otp', { email, otp: otpValue });
            toast.success("OTP verified! You can now reset your password.");
            navigate('/reset-password', { state: { email, otp: otpValue } });
        } catch (error) {
            console.log(error);
            toast.error("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-b from-grey-gradient-start to-grey-gradient-end p-20 rounded-3xl form-container">
            <form onSubmit={verifyOtpHandler} className="w-full max-w-md space-y-4">
                <div className="mb-6">
                    <ProgressIndicator step={2} /> 
                </div>
                <div className='mb-6 text-center'>
                    <h1 className="text-3xl font-bold">
                        <span className="text-purple-400">hola'</span>
                        <span className="text-white"> mi amigos</span>
                    </h1>
                </div>
                <div className='mb-6'>
                    <span className="block text-white mb-5 text-center">Enter the OTP sent to <br />your email address</span>
                    <div className="flex justify-center space-x-2">
                        {otp.map((data, index) => (
                            <Input
                                key={index}
                                type="text"
                                name="otp"
                                maxLength="1"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={(e) => e.target.select()}
                                className="w-12 h-12 text-center bg-[#2c2c2e] text-white rounded-lg border-[#746d91] border-[2px] focus:ring-1 focus:ring-purple-400"
                            />
                        ))}
                    </div>
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
                            Submit
                        </Button>
                    )
                }
            </form>
        </div>
    );
};

export default VerifyOtp;