import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  
  RouterProvider,
} from "react-router";
import { router } from './Router/Router';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='font-urbanist max-w-8xl mx-auto'>
     <RouterProvider router={router} />
   </div>
  </StrictMode>,
)
