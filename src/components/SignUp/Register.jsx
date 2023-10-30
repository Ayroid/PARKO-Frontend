import React, { useState } from 'react';
import logo from '../../assets/parko_logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    sapid: '',
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://parko.studio:3000/user/register', formData);
      
      if (response.status === 201) {
        // Registration was successful, you can handle the response here
        toast.success('Registration successful');
        console.log('Registration successful:', response.data);
      } else {
        // Registration failed, handle the error
        toast.error('Registration failed');

        console.error('Registration failed:', response.status);
      }
    } catch (error) {
      console.error('Error sending registration request:', error);
    }
  };

 

  return (
    <>
    <div className='font-Nunito'>
      <div className='flex flex-col items-center gap-5 pt-5'>
        <h3 className='text-3xl '>Sign Up</h3>
        <img src={logo} className='w-2/3'></img>
        <h2 className='text-4xl '>Welcome To Parko</h2>
        <p className='w-3/4 text-center'>Lorem ipsum is impy dummy test of the printing and typesitting</p>
      </div>

      <div className='pt-5'>
        <div className='bg-orange-500 rounded-tl-xl rounded-tr-xl p-5'>
          <form className='text-lg' onSubmit={handleSubmit}>
            <FloatingLabelInput
              label='Username'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
            <FloatingLabelInput
              label='Phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
            />
            <FloatingLabelInput
              label='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <FloatingLabelInput
              label='SAP ID'
              name='sapid'
              value={formData.sapid}
              onChange={handleChange}
            />
            

            <div className='p-5'>
              <button type='submit'  className='w-full py-2 text-gray-700 border rounded-md bg-yellow-400 focus:bg-yellow-500'>Sign Up</button>
            </div>
            <div className='text-center'>
                Already have an account? <button onClick={()=>{navigate('/')}} className='text-yellow-300'>Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <ToastContainer  position='top-center'/>
    </>


  );
};

const FloatingLabelInput = ({ label, name, value, onChange }) => {
  return (
    <div className='mb-4'>
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
        className='w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline focus:border-gray-900'
      />
    </div>
  );
};

export default Register;
