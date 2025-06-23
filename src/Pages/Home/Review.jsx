import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const reviews = [
  { id: 1, name: "Rafiul Islam", review: "Profast Courier delivered my package within 24 hours!", rating: 5 },
  { id: 2, name: "Tahmina Akter", review: "Excellent service and great support.", rating: 4 },
  { id: 3, name: "Jamal Hossain", review: "Most reliable so far.", rating: 5 },
  { id: 4, name: "Nadia Binte", review: "Fast and secure delivery!", rating: 4 },
  { id: 5, name: "Habib Rahman", review: "Great experience!", rating: 5 },
];

const CustomerReview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
  AOS.init({ duration: 8000 });
}, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);

  const getVisibleReviews = () => {
    return [0, 1, 2].map(i => {
      const index = (currentSlide + i) % reviews.length;
      return { ...reviews[index], position: i };
    });
  };

  return (
    <div
      id="customer-reviews"
      data-aos="zoom-in"
       
        data-aos-duration="3000"
        data-aos-delay="200"
        data-aos-offset="10"
        data-aos-easing="ease-out-cubic"
      
      // ✅ AOS animation
      className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 text-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          What Our Customers Say
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation */}
          <button onClick={prevSlide} className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white shadow-lg">
            <ChevronLeft className="text-xl text-green-600" />
          </button>
          <button onClick={nextSlide} className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white shadow-lg">
            <ChevronRight className="text-xl text-green-600" />
          </button>

          <div className="flex justify-center items-center space-x-6 h-80">
            {getVisibleReviews().map((review, index) => {
              const isCenter = review.position === 1;
              const isLeft = review.position === 0;
              const isRight = review.position === 2;
              return (
                <div
                  key={`${review.id}-${currentSlide}`}
                  className={`
                    transition-all duration-700 ease-in-out transform
                    ${isCenter ? 'opacity-100 scale-105 z-20' : 'opacity-30 scale-90 z-10'}
                    ${isLeft ? '-translate-x-4 rotate-2' : ''}
                    ${isRight ? 'translate-x-4 -rotate-2' : ''}
                  `}
                >
                  <div className="p-8 bg-white rounded-2xl shadow-xl h-72 w-80 flex flex-col justify-between relative">
                    <Quote className="text-green-500 text-3xl mb-4 mx-auto opacity-80" />
                    <p className="text-gray-700 italic mb-6 text-lg leading-relaxed flex-grow">
                      "{review.review}"
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-green-600 scale-125' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
