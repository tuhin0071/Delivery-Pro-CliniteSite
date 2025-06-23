import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';
import Logo from '../Shared/Logo';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row-reverse">
      {/* Left Side: Image */}
      <div className="w-full lg:w-1/2 bg-green-200 flex justify-center items-center p-6">
        <img
          src={authImg}
          className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto rounded-lg shadow-2xl object-contain"
          alt="Authentication Visual"
        />
      </div>

      {/* Right Side: Form + Logo */}
      <div className="relative w-full lg:w-1/2 bg-green-50 flex justify-center items-center px-6 py-12">
        {/* Logo in top-left corner */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 lg:top-8 lg:left-8">
          <Logo />
        </div>

        {/* Centered Outlet */}
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
