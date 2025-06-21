 import {
  createBrowserRouter,
  
} from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home/Home";
 
 
 
 
 
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
]);
