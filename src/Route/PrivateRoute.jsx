import React, { useContext } from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Auth-context/Authcontext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  

  if (loading) {
    return <div className="text-center py-20"> Loader </div>; // You can use your spinner here
  }

  if (!user) {
    return <Navigate state={{from:location.pathname}} to="/login"  replace />;
  }

  return children;
};

export default PrivateRoute;