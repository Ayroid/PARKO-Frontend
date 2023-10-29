import React, { useState } from 'react';
import logo from '../../assets/parko_logo.png';
import { Link } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    otp: '',
  });

  const [otpFieldDisabled, setOtpFieldDisabled] = useState(true); // Initialize as disabled


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    setOtpFieldDisabled(false);
    console.log('Form data submitted:', formData);
  };



  const { seconds } = useTimer({
    expiryTimestamp: Date.now() + 60 * 1000,
    onExpire: () => {
      console.warn('Expire timer expired');
    },
  });
  
  return (
<div className='font-Nunito '>
      <div className='flex flex-col items-center gap-5 pt-10 pb-7 '>
        <h3 className='text-3xl '>Log In</h3>
        <img src={logo} className='w-2/3'></img>
        <h2 className='text-4xl '>Welcome To Parko</h2>
        <p className='w-3/4 text-center'>Lorem ipsum is impy dummy test of the printing and typesitting</p>
      </div>

      <div className='pt-5'>
        <div className='bg-orange-500  rounded-tl-xl rounded-tr-xl p-5'>
          <form className='text-lg ' onSubmit={handleSubmit} >
           
            <FloatingLabelInput
              label='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />


            <FloatingLabelInput
                label='Enter OTP'
                name='otp'
                value={formData.otp}
                onChange={handleChange}
                disabled={otpFieldDisabled} // Apply the disabled attribute

            />

            {otpFieldDisabled ? <div></div> : <div className='flex justify-between'>
                <h4 className='text-sm text-yellow-400 text-left'>Re-Send OTP in <span>{seconds} seconds</span></h4>
            
                {/*  resend OTP button here  */}
                <button   className='  text-white border-none text-sm focus:text-black'>Send OTP</button>                    
             </div>  }
          

            <div className='p-5'>
                {otpFieldDisabled   ?  <button type='submit'  className='w-full py-2 text-gray-700 border rounded-md bg-yellow-400 focus:bg-yellow-500'>Send OTP</button>
 :               <button type='submit'  className='w-full py-2 text-gray-700 border rounded-md bg-yellow-400 focus:bg-yellow-500'>Log In</button>
                }
            </div>

          

            <div className='text-center pb-10'>
                Don't have an account? <Link to='/register' className='text-yellow-300'>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const FloatingLabelInput = ({ label, name, value, onChange ,disabled}) => {
  return (
    <div className='mt-6 mb-6'>
      <label
        htmlFor={name}
        className={`absolute transform ${value ? '-translate-y-2 text-xs text-gray-600' : 'text-base'} transition-transform duration-300 px-3 py-2`}
      >
        {label}
      </label>
      <input
        type='text'
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
