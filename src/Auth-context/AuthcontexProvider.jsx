import React, { useEffect, useState } from 'react';
import { AuthContext } from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider,signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const AuthcontexProvider = ({children}) => {

      const [user ,setUser]= useState(null);
      const [loading,setLoading] = useState(true)

 const createUser= (email, password) => {
setLoading(true)
      return createUserWithEmailAndPassword(auth,email,password)
 }

 const signin = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword( auth,email,password)
 }

 const logout = ()=> {
      setLoading(true)
      return signOut (auth)
 }



 const updateUser = (userInfo)=>{
      setLoading(true)
      return updateCurrentUser(auth.currentUser, userInfo)
 }

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
        setLoading(false);
      console.log('user',currentUser);
      
    });
    return () => unsubscribe();
  }, []);

const googleProvider = new GoogleAuthProvider();

 const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

      const authInfo = {
            user,
            createUser,
            loading,
            signin,
            googleLogin,
            logout,
            updateUser

      }
      return (
            <AuthContext.Provider value={authInfo}>
                  {children}
            </AuthContext.Provider>
      );
};



export default AuthcontexProvider;