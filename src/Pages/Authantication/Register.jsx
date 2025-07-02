import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';


const Register = () => {

const {createUser} = UseAuth()
const { googleLogin } = UseAuth();
const location = useLocation();
const navigate = useNavigate();
const from = location.state?.from || '/';



const {register,handleSubmit,formState:{errors}} = useForm();
const onSubmit = data =>{
      console.log(data);
      createUser(data.email,data.password)
      .then(result =>{
            console.log(result.user);
            
      }).catch(
            error =>{
                  console.error(error)
            }
      )
      
      
}




const handleGoogleLogin = () => {
  googleLogin()
    .then(result => {
      console.log('Google user:', result.user);
      navigate(from);
    })
    .catch(error => {
      console.error('Google login error:', error.message);
    });
};

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 mt-12">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">Register a new account</h2>
        <p className="text-sm text-center dark:text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>

        <div className="my-6 space-y-4">
          <button
          onClick={handleGoogleLogin}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-3 space-x-4 border rounded-md hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="w-5 h-5 fill-current">
  <path
    d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272v95.4h146.9c-6.4 34.5-25.7 63.7-54.7 83.2v68h88.4c51.8-47.7 80.9-118 80.9-196.2z"
    fill="#4285F4"
  />
  <path
    d="M272 544.3c73.8 0 135.8-24.5 181-66.6l-88.4-68c-24.6 16.5-56 26.2-92.6 26.2-71 0-131.2-47.9-152.7-112.1h-90.1v70.6c45.1 89.2 137.8 150 242.8 150z"
    fill="#34A853"
  />
  <path
    d="M119.3 323.8c-10.7-31.2-10.7-64.9 0-96.1v-70.6h-90.1c-39.1 77.3-39.1 169.9 0 247.2l90.1-70.5z"
    fill="#FBBC05"
  />
  <path
    d="M272 107.7c39.9 0 75.7 13.7 103.9 40.6l77.8-77.8C407.7 24.2 345.7 0 272 0 167 0 74.3 60.8 29.2 150l90.1 70.6c21.5-64.2 81.7-112.1 152.7-112.1z"
    fill="#EA4335"
  />
</svg>

            <p>Register with Google</p>
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow dark:text-gray-600" />
          <span className="px-3 text-gray-400">OR</span>
          <hr className="flex-grow dark:text-gray-600" />
        </div>

        <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)} >
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register('email',{required:true})}
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-violet-600"
            />


            {
                  errors.email?.type === 'required' && <p className='text-red-500'>
                        Required Email
                  </p> 
            }
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"

              {...register('password')}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-violet-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-md bg-green-500 text-white hover:bg-violet-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
