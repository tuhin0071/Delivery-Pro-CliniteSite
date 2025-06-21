import React from 'react';
import { FaShippingFast, FaMapMarkedAlt, FaBoxOpen, FaMoneyBillWave, FaWarehouse, FaUndo } from 'react-icons/fa';

const services = [
  {
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast className="text-4xl text-primary" />
  },
  {
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaMapMarkedAlt className="text-4xl text-primary" />
  },
  {
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaBoxOpen className="text-4xl text-primary" />
  },
  {
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave className="text-4xl text-primary" />
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaWarehouse className="text-4xl text-primary" />
  },
  {
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndo className="text-4xl text-primary" />
  }
];

const Services = () => {
  return (
    <section className=" px-4 md:px-10 bg-amber-50 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-emerald-400 font-bold">Our Services</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">We are committed to delivering reliable and efficient logistics services across Bangladesh.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="card bg-white-100 shadow-xl p-6 border hover:bg-emerald-400 transition-all duration-300">
            <div className="mb-4 flex items-center justify-center">
              {service.icon}
            </div>
            <div className="card-body items-center text-center">
              <h3 className="card-title btext-black">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
