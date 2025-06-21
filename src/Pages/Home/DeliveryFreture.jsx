import React from 'react';
import { FaTruck, FaGlobeAsia, FaBoxOpen, FaMoneyCheckAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Express & Standard Delivery',
    description: 'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery in Dhaka within 4–6 hours.',
    icon: <FaTruck className="text-5xl text-primary" />,
  },
  {
    title: 'Nationwide Coverage',
    description: 'Home delivery available in every district of Bangladesh. Reliable and fast shipping across the country within 48–72 hours.',
    icon: <FaGlobeAsia className="text-5xl text-primary" />,
  },
  {
    title: 'Inventory & Fulfillment',
    description: 'Custom solutions with inventory management, packaging, online order processing, and full backend support.',
    icon: <FaBoxOpen className="text-5xl text-primary" />,
  },
  {
    title: 'Cash on Delivery',
    description: 'We offer secure cash-on-delivery anywhere in Bangladesh with guaranteed product safety.',
    icon: <FaMoneyCheckAlt className="text-5xl text-primary" />,
  },
];

const DeliveryFeatures = () => {
  return (
    <section className=" px-4 md:px-12 bg-gray-300 py-14">
      <div className="text-center mb-12 fl">
        <h2 className="text-3xl md:text-4xl text-emerald-600 font-bold">Why Choose Us</h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Trusted logistics partner for thousands of businesses across Bangladesh.
        </p>
      </div>

      <div className="space-y-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card py-9 lg:card-side bg-base-100 shadow-md hover:shadow-xl transition duration-300"
          >
            <figure className="p-6">
              <div className="bg-primary/10 p-6 rounded-full">
                {feature.icon}
              </div>
            </figure>
            <div className="card-body flex flex-col justify-center mt-5 ">
              <h2 className="card-title">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryFeatures;
