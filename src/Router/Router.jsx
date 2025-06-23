 import {
  createBrowserRouter,
  
} from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Pages/Authantication/Login";
import Register from "../Pages/Authantication/Register";
 
 
 
 
 
 export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
{
      index:true,
      element: <Home/>
}


    ]
  },
  {
 path:'/',
 element:<AuthLayout/>,
children:[
  {
 path:'/login',
 element:<Login/>
  },{
    path:'/register',
    element:<Register/>
  }
]
  }
]);
