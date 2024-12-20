import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import axios from 'axios';
import EyeIcon from './EyeIcon';
import './Layout.css'; // Import the CSS file

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveLogin, setSaveLogin] = useState(false); // State for saving login
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedLogin = localStorage.getItem('savedLogin');
    if (savedLogin) {
      const { email, password } = JSON.parse(savedLogin);
      setInput({ email, password });
      handleLogin(email, password);
    }
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('https://hola-project.onrender.com/api/auth/login/', {
        email,
        password
      });

      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);

        const authenticatedUser = {
          email,
          token: response.data.access,
        };

        dispatch(setAuthUser(authenticatedUser));

        if (saveLogin) {
          localStorage.setItem('savedLogin', JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem('savedLogin');
        }

        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      console.error('Error response:', error.response);
      if (!navigator.onLine) {
        toast.error("No internet connection. Please check your network settings.");
      } else if (error.response) {
        const errorMessage = error.response.data.message || "Login failed! Please try again.";
        toast.error(`Error: ${errorMessage} (Status: ${error.response.status})`);
      } else {
        toast.error("Login failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    handleLogin(input.email, input.password);
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
          <h1 className="text-4xl font-bold font-baloo">
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
            <EyeIcon isVisible={showPassword} toggleVisibility={togglePasswordVisibility} />
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="saveLogin"
            checked={saveLogin}
            onChange={() => setSaveLogin(!saveLogin)}
            className="mr-2"
          />
          <label htmlFor="saveLogin" className="text-sm text-white">
            Remember me
          </label>
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
          <div className="flex-grow h-px bg-[#cbb3ff]"></div>
          <span className="px-4 text-sm text-[#cbb3ff]">OR</span>
          <div className="flex-grow h-px bg-[#cbb3ff]"></div>
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