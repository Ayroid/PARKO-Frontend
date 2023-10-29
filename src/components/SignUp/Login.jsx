import React, { useState } from 'react';
import logo from '../../assets/parko_logo.png';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    sapId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, for example, by sending the data to an API.
    console.log('Form data submitted:', formData);
  };

  return (
    <div className='font-Nunito'>
        <div className='flex flex-col items-center gap-5 pt-10'>
            <h3 className='text-3xl'>Log In</h3>
            <img src={logo} className='w-1/2'></img>
            <h2 className='text-4xl'>Welcome To Parko</h2>
            <p className='w-3/4 text-center'>Lorem ipsum is impy dummy test of the printing and typesitting</p>
        </div>

        <div className='bg-orange-500'>
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label htmlFor="sapId">SAP ID:</label>
                    <input
                        type="text"
                        id="sapId"
                        name="sapId"
                        value={formData.sapId}
                        onChange={handleChange}
                    />
                    </div>
                    <button type="submit">Submit</button>
                </form>
        </div>
      
    </div>
  );
};

export default Login;
