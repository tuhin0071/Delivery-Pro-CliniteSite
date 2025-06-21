import React from 'react';
import logo from '../assets/logo.png'

const Logo = () => {
      return (
            <div className='flex items-end'>
                  <img className='mb-1' src={logo} alt="" />
                  <p className= " text-2xl ml-1 font-extrabold" >Delivery-Pro</p>
            </div>
      );
};

export default Logo;