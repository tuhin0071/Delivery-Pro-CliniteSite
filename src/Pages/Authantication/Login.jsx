import { Link } from 'react-router';
import React from 'react';
import { useForm,  } from "react-hook-form"

const Login = () => {

const { register,handleSubmit,formState:{errors}} = useForm();

const onSubmit = data =>{

      console.log(data);
      
}

      return (
            <div>

            <form  onSubmit={handleSubmit(onSubmit)}  className=' w-xl text-center'>
                   <div className="card">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email"
            {...register('email',{ required:true})}
          />

{

      errors.email?.type === 'required' && <p className='text-red-500'>
            Email is Required
      </p> 
}

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" 
           {...register("password")}
          />
          <div><a className="link link-hover text-black">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4 w-80">Login</button>
        </fieldset>
      </div>
            </form>

            <p className='text-gray-500'>Don’t have any account? <Link to='/register' className='text-green-400' >Register</Link> </p>
      </div>
      );
};

export default Login;