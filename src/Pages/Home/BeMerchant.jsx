
// BeMerchant.jsx
import React from 'react';
import location from '../../assets/location-merchant.png';

const BeMerchant = () => {
  return (
    <>
      <div 
        data-aos="fade-up" 
        data-aos-duration="3000"
        data-aos-delay="200"
        data-aos-offset="10"
        data-aos-easing="ease-out-cubic"
        className="bg-no-repeat bg-top-center bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] p-20"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={location}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Location"
          />
          <div>
            <h1 className="text-4xl font-bold text-white">
              Merchant and Customer Satisfaction <br /> is Our First Priority
            </h1>
            <p className="py-6 text-[16px] text-white">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>
            <button className="btn rounded-4xl mr-2.5 bg-green-600 text-white">
              Become a Merchant
            </button>
            <button className="btn rounded-4xl text-green-600 border-2 pl-1.5 border-green-600 bg-transparent">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeMerchant;