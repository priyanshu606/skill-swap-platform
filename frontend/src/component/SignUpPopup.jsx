import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
const SignUpPopup = ({ onClose ,openLogin}) => {
  const [form,setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors,setErrors] = useState({});
  
  const validate = ()=>{
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!form.fullName.trim()){
      newErrors.fullName = 'fullName is required'
    }
    if(!form.email.trim()){
      newErrors.email = 'Email is required'
    }else if(!emailRegex.test(form.email)){
      newErrors.email = 'Invalid email format';
    }
    if(!form.password.trim()){
       newErrors.password = 'Password is required';
    }else if(form.password.length<6){
      newErrors.password = 'Password must be at least 6 characters';
    }
    if(!form.confirmPassword.trim()){
       newErrors.confirmPassword = 'confirm password is required';
    }else if(form.confirmPassword!=form.password){
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e)=>{
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:8009/api/signup',form)
        console.log('✅ User registered:', response.data);
        onClose();
        openLogin();
      } catch (error) {
         console.error('❌ Signup failed:', error.response?.data || error.message);
      }
      console.log('✅ Form submitted:', form);
      // send to backend here
    } else {
      console.log('❌ Validation failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-blue-100">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition"
        >
          <IoClose />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Sign-Up
        </h2>

        {/* Sign Up Form */}
        <form className="space-y-5" onSubmit={handleSubmit} >
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
          
            />
           
          </div>
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
            
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
              
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"  
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
  
            />
          </div>
           {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2.5 rounded-md shadow-md transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={openLogin}
            className="text-blue-500 hover:underline font-medium"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPopup;
