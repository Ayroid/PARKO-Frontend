import React, { useState } from 'react';
import logo from '../../assets/parko_logo.png';
import { useTimer } from 'react-timer-hook';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    otpValue: '',
  });

  const navigate = useNavigate();


  const [otpFieldDisabled, setOtpFieldDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle validation for otpValue based on its type
    if (name === 'otpValue') {
      // Parse the input value as an integer (number)
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/verify/mail', formData);
      
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        toast.success('Login successful');
        navigate('/home');
      } else {
        console.error('Login failed:', response.status);
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error sending Login request:', error);
    }
  };

  const sendUsernameToBackend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/login/mail', formData);
      
      if (response.status === 200) {
        console.log('OTP request successful:', response.data);
        toast.success('OTP SENT')
      }
    } catch (error) {
      console.error('Error sending OTP request:', error);
      toast.error('Error sending OTP request');
    }

    setOtpFieldDisabled(false);
  };

  const { seconds } = useTimer({
    expiryTimestamp: Date.now() + 60 * 1000,
    onExpire: () => {
      console.warn('Expire timer expired');
    },
  });
  
  return (
    <div>
    <div className='font-Nunito'>
      <div className='flex flex-col items-center gap-5 pt-10 pb-7'>
        <h3 className='text-3xl'>Log In</h3>
        <img src={logo} className='w-2/3' alt='logo' />
        <h2 className='text-4xl'>Welcome To Parko</h2>
        <p className='w-3/4 text-center'>Lorem ipsum is simply dummy text of the printing and typesetting</p>
      </div>

      <div className='pt-5'>
        <div className='bg-orange-500 rounded-tl-xl rounded-tr-xl p-5'>
          <form className='text-lg'>
           
            <FloatingLabelInput
              label='Email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              disabled={!otpFieldDisabled}
            />

            <FloatingLabelInput
              label='Enter OTP'
              name='otpValue'
              type='number'
              value={formData.otpValue}
              onChange={handleChange}
              disabled={otpFieldDisabled}
            />

            {otpFieldDisabled ? <div></div> : <div className='flex justify-between'>
                <h4 className='text-sm text-yellow-400 text-left'>Re-Send OTP in <span>{seconds} seconds</span></h4>
                <button className='text-white border-none text-sm focus:text-black' onClick={sendUsernameToBackend}>
                  Send OTP
                </button>
             </div>}

            <div className='p-5'>
              {otpFieldDisabled ? (
                <button onClick={sendUsernameToBackend} className='w-full py-2 text-gray-700 border rounded-md bg-yellow-400 focus:bg-yellow-500'>
                  Send OTP
                </button>
              ) : (
                <button type='submit' onClick={handleSubmit} className='w-full py-2 text-gray-700 border rounded-md bg-yellow-400 focus:bg-yellow-500'>
                  Log In
                </button>
              )}
            </div>

            <div className='text-center pb-10'>
              Don't have an account? <button onClick={()=>{navigate('/register')}} className='text-yellow-300'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer  position='top-center'/>
    </div>
  );
};

const FloatingLabelInput = ({ label, type, name, value, onChange, disabled }) => {
  return (
    <div className='mt-6 mb-6'>
      <label
        htmlFor={name}
        className={`absolute transform ${value ? '-translate-y-2 text-xs text-gray-600' : 'text-base'} transition-transform duration-300 px-3 py-2`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className='w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline focus:border-gray-900'
      />
    </div>
  );
};

export default Login;
