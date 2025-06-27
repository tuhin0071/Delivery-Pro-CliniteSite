import React from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
      return (
            <Link to="/" >
            
            <div className='flex items-end'>
                  <img className='mb-1' src={logo} alt="" />
                  <p className= " text-2xl -ml-3 font-extrabold text-black" >Delivery-Pro</p>
            </div>
            </Link>
      );
};

export default Logo;