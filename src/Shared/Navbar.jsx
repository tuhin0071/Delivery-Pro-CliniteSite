import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import UseAuth from '../Hooks/UseAuth';

const Navbar = () => {


const {user}= UseAuth();
const navItems =  <>

<li className='text-black'> <NavLink to="/"  >Home</NavLink> </li>
        <li className='text-black'> <NavLink to="/coverage"  >Coverage</NavLink> </li>
           <li className='text-black'> <NavLink to="/send"  >SendParcel</NavLink> </li>
        <li> <NavLink to="/about" >About us</NavLink>  </li>


        {
          user && <>
          
          <li className='text-black'> <NavLink to="/dashboard"  >Dashboard</NavLink> </li>
          </>
        }

</>

      return (




            <div>
                  <div className="navbar bg-yellow-50 shadow-sm rounded-3xl px-5 my-8 py-2">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navItems}
      </ul>
    </div>
    <div className=" text-xl">
      <Logo/>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navItems}
    </ul>
  </div>
  <div className="navbar-end">
    <Link to="/login" className="btn text-black bg-primary">Login</Link>
  </div>
</div>
            </div>
      );
};

export default Navbar;