import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  
  RouterProvider,
} from "react-router";
import { router } from './Router/Router';
import AuthcontexProvider from './Auth-context/AuthcontexProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='font-urbanist max-w-8xl mx-auto'>
      <QueryClientProvider client={queryClient}>
   <AuthcontexProvider>
      <RouterProvider router={router} />
   </AuthcontexProvider>
   </QueryClientProvider>
   </div>
  </StrictMode>,
)
