import React from 'react';
import Marquee from 'react-fast-marquee';

// import your logos
import logo1 from '../../assets/brands/amazon.png';
import logo2 from '../../assets/brands/amazon_vector.png';
import logo3 from '../../assets/brands/casio.png';
import logo4 from '../../assets/brands/moonstar.png';
import logo5 from '../../assets/brands/randstad.png';
import logo6 from '../../assets/brands/start.png';
import logo7 from '../../assets/brands/start-people 1.png';




const CompanyLogos = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5,logo6,logo7];

  return (
    <section className=" px-4 md:px-10 bg-amber-50 pb-9">
      <div className="text-center mb-6 text-emerald-600 py-7">
        <h2 className="text-2xl md:text-3xl font-semibold">Trusted by Leading Brands</h2>
        <p className="text-gray-500 text-sm mt-1">Some of our valued partners</p>
      </div>

      <Marquee gradient={false} speed={50}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-8 py-1.5 shadow-lg hover:shadow-lg transition-shadow duration-300  ">
            <img src={logo} alt={`Company ${index + 1}`} className="h-16 w-[110px] object-contain" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default CompanyLogos;
