import React, { use } from 'react';
import { AuthContext } from '../Auth-context/Authcontext';

const UseAuth = () => {
   const authInfo = use(AuthContext);
   return authInfo;
};

export default UseAuth;