import React from 'react';
import './Loader.css'; // Make sure this file is imported

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
