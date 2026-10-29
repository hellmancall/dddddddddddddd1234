import React, { useState } from 'react';

const TeslaCareers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
    const handleonclick = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const products = [
    {
      title: 'Robotaxi',
      description: 'Develop the future of autonomous transportation.',
      image: '/Images/work1.avif',
      viewJobs: "#form",
      learnMore: 'https://www.tesla.com/robotaxi'
    },
    {
      title: 'Full Self-Driving (Supervised)',
      description: 'Work with the largest real-world dataset to build AI that can drive better than humans.',
      image: '/Images/work2.avif',
      viewJobs: "#form",
      learnMore: 'https://www.tesla.com/fsd'
    },
    {
      title: 'Optimus',
      description: 'Solve embodied intelligence and work on our bi-pedal humanoid robots.',
      image: '/Images/work3.avif',
      viewJobs: "#form",
      learnMore: 'https://www.tesla.com/AI'
    },
    {
      title: 'Vehicle Lineup',
      description: 'Manufacture and scale all of the vehicles in our lineup.',
      image: '/Images/work4.avif',
      viewJobs: "#form",
      learnMore: 'https://www.tesla.com/'
    },
    {
      title: 'Megapack',
      description: 'Work on large-scale energy storage for utilities and communities.',
      image: '/Images/work5.avif',
      viewJobs: "#form",
      learnMore: 'https://www.tesla.com/megapack'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < products.length - 3) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="w-full bg-white pb-48">
      {/* Search Bar */}
      <div className="w-full bg-white py-4 mt-10">
        <div className="max-w-md mx-auto px-2 pb-12 ">
          <div className="relative">
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#5c5e62] font-[dmedium]" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="currentColor" 
                d="m20.267 19.207-4.818-4.818A6.97 6.97 0 0 0 17 10a7 7 0 1 0-7 7 6.97 6.97 0 0 0 4.389-1.55l4.818 4.817a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06M4.5 10c0-3.033 2.467-5.5 5.5-5.5s5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5-5.5-2.467-5.5-5.5"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by Role or Department"
              className="w-full pl-12 pr-4 py-3 h-[40px] rounded-sm bg-gray-100  focus:border border-gray-300 focus:outline-none text-base font-[dregular] text-[#5c5e62]"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-[90%] lg:max-w-[82%] mx-auto px-4 lg:px-6 pt-12 lg:pt-20 pb-8 lg:pb-12">
        <div className="flex justify-center items-center gap-8 lg:gap-16 mb-24 lg:mb-48">
          <div className="">
            <div className="text-[32px] lg:text-[64px] font-[dmedium] mb-1 lg:mb-3 h-[32px] lg:h-[64px]">150<span className="text-xl lg:text-4xl">+</span></div>
            <div className="text-[#5c5e62] text-sm lg:text-xl font-[dregular]">Teams</div>
          </div>
          <div className="w-px h-12 lg:h-20 bg-gray-300"></div>
          <div className="text-left">
            <div className="text-[32px] lg:text-[64px] font-[dmedium] mb-1 lg:mb-3 h-[32px] lg:h-[64px]">53</div>
            <div className="text-[#5c5e62] text-sm lg:text-xl font-[dregular]">Countries</div>
          </div>
          <div className="w-px h-12 lg:h-20 bg-gray-300"></div>
          <div className="text-left">
            <div className="text-[32px] lg:text-[64px] font-[dmedium] mb-1 lg:mb-3 h-[32px] lg:h-[64px]">1</div>
            <div className="text-[#5c5e62] text-sm lg:text-xl font-[dregular]">Mission</div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16 lg:mb-32">
          <h2 className="text-3xl lg:text-5xl font-[dmedium] mb-2">Become Part of Our Mission</h2>
          <p className="text-[#5c5e62] text-base lg:text-lg font-[dregular] mb-4 lg:mb-6">Our mission is to build a world of amazing abundance.</p>
          <p className="text-[#5c5e62] text-base lg:text-lg font-[dregular] max-w-full lg:max-w-[90%]">
            Our employees are driving that mission forward through their work in sustainable transport, 
            renewable energy, robotics and AI. Join us in solving the engineering, manufacturing and 
            operational challenges that will unlock the future of Tesla.
          </p>
        </div>
      </div>

      {/* Products Carousel Section */}
      <div className="pb-12 lg:pb-20">
        <div className="max-w-[90%] lg:max-w-[82%] mx-auto px-4 lg:px-6">
          <h2 className="text-3xl lg:text-5xl font-[dmedium] mb-8 lg:mb-12">Work on Innovative Products</h2>
        </div>
        
        <div className="relative">
          {/* Mobile: Touch Scroll */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-4">
              {products.map((product, index) => (
                <div key={index} className="flex-shrink-0 w-[90vw]">
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[280px] object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-[dmedium] mb-1">{product.title}</h3>
                  <div className="flex gap-3 mb-1">
                    <a href={product.viewJobs} className="text-sm font-[dregular] text-black border-b border-black hover:border-b-2">
                      View Jobs
                    </a>
                    <a href={product.learnMore} className="text-sm font-[dregular] text-black border-b border-black hover:border-b-2">
                      Learn More
                    </a>
                  </div>
                  <p className="text-sm font-[dregular] text-[#5c5e62]">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Carousel with Arrows */}
          <div className="hidden lg:block overflow-hidden">
          {/* Desktop: Carousel with Arrows */}
          <div className="hidden lg:block overflow-hidden">
          {/* Carousel Container */}
          <div 
            className={`flex gap-6 transition-all duration-500 ease-out ${
              currentSlide === 0 ? 'pl-[12rem]' : currentSlide === products.length - 3 ? 'pr-32' : ''
            }`}
            style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
          >
            {products.map((product, index) => (
              <div key={index} className="flex-shrink-0 w-[580px]">
                <div className="relative mb-6 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[580px] object-cover"
                  />
                </div>
                <h3 className="text-[34px] font-[dmedium] mb-2">{product.title}</h3>
                <div className="flex gap-4 mb-2">
                  <a href={product.viewJobs} className="text-xl font-[dregular] text-black border-b border-black hover:border-b-2">
                    View Jobs
                  </a>
                  <a href={product.learnMore} className="text-xl font-[dregular] text-black border-b border-black hover:border-b-2">
                    Learn More
                  </a>
                </div>
                <p className="text-xl font-[dregular] text-[#5c5e62] max-w-[532px]">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
          </div>

          {/* Navigation Arrows - Desktop Only */}
          {currentSlide < products.length - 3 && (
            <button
              onClick={nextSlide}
              className="hidden lg:block absolute right-8 top-72 transform -translate-y-1/2 bg-white/75 rounded-sm p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="m8.943 19.78 7.213-7.232a.75.75 0 0 0 0-1.06L8.906 4.22a.75.75 0 0 0-1.062 1.06l6.721 6.739-6.684 6.701a.75.75 0 0 0 1.062 1.06"></path>
              </svg>
            </button>
          )}

          {/* Navigation Arrow - Left */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="hidden lg:block absolute left-8 top-72 transform -translate-y-1/2 bg-white/75 rounded-sm p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 rotate-180" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="m8.943 19.78 7.213-7.232a.75.75 0 0 0 0-1.06L8.906 4.22a.75.75 0 0 0-1.062 1.06l6.721 6.739-6.684 6.701a.75.75 0 0 0 1.062 1.06"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
    </div>
  );
  };

export default TeslaCareers;