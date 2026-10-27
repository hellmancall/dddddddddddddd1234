import React, { useState } from "react";

const FeaturedDepartments = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [windowStart, setWindowStart] = useState(0);

    const handleonclick = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const departments = [
    {
      id: 1,
      title: "Artificial Intelligence",
      description: "Build and scale the models that support the advancement of our AI technology.",
      image: "/Images/featured1.avif",
      url: "https://www.tesla.com/AI"
    },
    {
      id: 2,
      title: "Manufacturing",
      description: "Join engineers, technicians and production and safety professionals in the design and manufacturing of our products.",
      image: "/Images/featured2.avif",
      url: "https://www.tesla.com/manufacturing"
    },
    {
      id: 3,
      title: "Cell Engineering",
      description: "Solve the next generation of battery challenges to reach terawatt-scale battery production.",
      image: "/Images/featured3.avif",
      url: "https://www.tesla.com/cell-jobs"
    },
    {
      id: 4,
      title: "Service",
      description: "Perform structural and cosmetic repairs, vehicle diagnostics, and preventative maintenance.",
      image: "/Images/featured4.avif",
      url: "https://www.tesla.com/service-recruitment"
    }
  ];

  const handleCardClick = (index) => {
    setActiveSlide(index);
    
    // Adjust window based on active slide for smooth progressive shifting
    if (index === 0) {
      setWindowStart(0); // Show: AI, Manufacturing, Cell
    } else if (index === 1) {
      setWindowStart(0); // Show: AI, Manufacturing, Cell (with slight shift to peek Service)
    } else if (index === 2) {
      setWindowStart(0.5); // Show: More of Service visible
    } else if (index === 3) {
      setWindowStart(1); // Show: Manufacturing, Cell, Service fully
    }
  };

  // Get visible departments - now can handle fractional windowStart
  const getVisibleDepartments = () => {
    const visible = [];
    const startIndex = Math.floor(windowStart);
    for (let i = 0; i < 3; i++) { // Show 4 cards for smoother transitions
      const index = startIndex + i;
      if (index < departments.length) {
        visible.push({ ...departments[index], originalIndex: index });
      }
    }
    return visible;
  };

  const visibleDepartments = getVisibleDepartments();
  
  // Calculate transform based on windowStart and activeSlide
  const getTransform = () => {
    if (activeSlide === 0) return 'translateX(0%)';
    if (activeSlide === 1) return 'translateX(-8%)'; // Slight shift to peek Service
    if (activeSlide === 2) return 'translateX(-25%)'; // More shift to show more Service
    if (activeSlide === 3) return 'translateX(-33.33%)'; // Full shift to show last 3
    return 'translateX(0%)';
  };

  return (
    <section className="w-full bg-white py-8 lg:py-12 sm:px-6 lg:px-8 pb-24 lg:pb-48">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        {/* Header */}
        <h2 className="text-2xl lg:text-4xl xl:text-5xl font-[dmedium] mb-6 lg:mb-8 xl:mb-12">Featured Departments</h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Image - Force re-render with key */}
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg mb-6">
            <img
              key={`img-${activeSlide}`}
              src={departments[activeSlide].image}
              alt={departments[activeSlide].title}
              className="w-full h-full object-cover animate-fadeIn"
            />
          </div>

          {/* Department Cards - Show 4 cards with smooth sliding */}
          <div className="relative">
            {/* Mobile: Touch Scroll */}
            <div className="lg:hidden overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 lg:px-4">
                {departments.map((dept, index) => {
                  const isActive = index === activeSlide;
                  return (
                    <div
                      key={dept.id}
                      onClick={() => handleCardClick(index)}
                      className="flex-shrink-0 w-[90vw] cursor-pointer transition-all duration-500"
                    >
                      <div className="w-full bg-[#5c5e62] mb-2 overflow-hidden h-1.5">
                        <div className="bg-black transition-all duration-300 w-full h-1.5" />
                      </div>
                      <h3 className="text-lg font-[dmedium] mb-1">{dept.title}</h3>
                      <a 
                        href={dept.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm border-b border-black mb-2 inline-block hover:border-b-2 text-black font-[dregular]"
                      >
                        Learn More
                      </a>
                      <p className="text-sm text-[#5c5e62] font-[dregular] leading-relaxed">
                        {dept.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop: Carousel */}
            <div className="hidden lg:block overflow-hidden">
            {/* Desktop: Carousel */}
            <div className="hidden lg:block overflow-hidden">
            {/* Left fade overlay - only show if not on first slide */}
            {activeSlide > 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            )}
            
            {/* Right fade overlay - only show if not on last slide */}
            {activeSlide < departments.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            )}
            
            <div 
              className="flex gap-6 transition-transform duration-700 ease-out"
              style={{ transform: getTransform() }}
            >
              {departments.map((dept, index) => {
                const isActive = index === activeSlide;
                return (
                  <div
                    key={dept.id}
                    onClick={() => handleCardClick(index)}
                    className={`flex-shrink-0 w-[calc(33.333%-16px)] cursor-pointer transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-30 hover:opacity-75'
                    }`}
                  >
                    {/* Progress Bar */}
                    <div className={`w-full bg-[#5c5e62] mb-4 overflow-hidden ${isActive ? 'h-2' : 'h-1'}`}>
                      <div
                        className={`bg-black transition-all duration-300 ${
                          isActive ? 'w-full h-2' : 'w-0 h-1'
                        }`}
                      />
                    </div>

                    {/* Department Title */}
                    <h3 className="text-[34px] font-[dmedium] mb-2">
                      {dept.title}
                    </h3>
                    
                    {/* Learn More Link */}
                    <a 
                      href={dept.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl border-b border-black mb-3 inline-block hover:border-b-2 text-black font-[dregular]"
                    >
                      Learn More
                    </a>

                    {/* Description */}
                    <p className="text-xl text-[#5c5e62] font-[dregular] leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedDepartments;