 import {
  createBrowserRouter,
  
} from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Pages/Authantication/Login";
import Register from "../Pages/Authantication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../Route/PrivateRoute";
import SendPercel from "../Pages/SendPercel";
 
 
 
 
 
 export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
{
      index:true,
      element: <Home/>
},{

  path: "/coverage",
  element:<Coverage/>
},{
  path:"/send",

element: <PrivateRoute>
  <SendPercel/>
</PrivateRoute>

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
