import React from 'react';
import Banner from './Banner';

import Services from '../../compnent/Service';
import CompanyLogos from './ClinteLogoMarque';
import DeliveryFeatures from './DeliveryFreture';
import BeMerchant from './BeMerchant';
import CustomerReview from './Review';

const Home = () => {
      return (
            <div>
                  <Banner/>
                  <Services/>
                  <CompanyLogos/>
                  <DeliveryFeatures/>
                 <div className='px-8 '>
                   <BeMerchant/>
                 </div>
                 <CustomerReview/>
            </div>
      );
};

export default Home;