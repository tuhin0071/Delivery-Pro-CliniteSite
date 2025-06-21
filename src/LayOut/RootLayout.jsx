// RootLayout.jsx
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RootLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 8000,
      once: false, // Animations can repeat on scroll up/down
      offset: 2, // Trigger animation 50px before element enters viewport
      delay: 1000, // Global delay - individual elements can override this
      easing: 'ease-in',
      mirror: true, // Animate elements out when scrolling past them
      anchorPlacement: 'top-bottom', // Animation trigger point
      startEvent: 'DOMContentLoaded',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });
    
    // Refresh AOS on route changes and window resize
    const handleRouteChange = () => {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    };
    
    window.addEventListener('resize', AOS.refresh);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', AOS.refresh);
    };
  }, []);

  return (
    <>
      <div className="font-urbanist max-w-8xl mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
