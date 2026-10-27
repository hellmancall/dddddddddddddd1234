import React from "react";

const LifeAtTesla = () => {
    const handleonclick = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <section className="w-full bg-white py-12 lg:py-24 pb-24 lg:pb-48">
      <div className="max-w-[90%] lg:max-w-[82%] mx-auto lg:px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl xl:text-5xl font-[dmedium] mb-2">
            Life at Tesla
          </h2>

          <p className="text-[#5c5e62] text-sm lg:text-base xl:text-xl !leading-normal mb-6 lg:mb-8 font-[dmedium]">
            We are committed to attracting, developing and investing in exceptional
            talent and supporting their growth, regardless of their background.
          </p>

          <button onClick={handleonclick} className="bg-[#111827] text-white rounded-sm h-10 w-[160px] lg:w-[200px] text-xs lg:text-sm font-[dmedium] hover:bg-black transition">
            Learn More
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

          {/* LEFT CARD */}
          <div>
            <img
              src="/Images/life1.avif"
              alt="Collaborative Environment"
              className="w-full h-[200px] lg:h-[370px] object-cover rounded-lg mb-4 lg:mb-8"
            />

            <h3 className="text-lg lg:text-xl xl:text-[34px] font-[dmedium] mb-2">
              Collaborative Environment
            </h3>

            <p className="text-[#5c5e62] leading-relaxed text-sm lg:text-base xl:text-xl font-[dregular]">
              We’ve replaced corporate hierarchy and bureaucratic conventions with
              open communication and a collaborative working environment. By
              promoting a safe, innovative and inclusive culture, everyone can
              succeed.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div>
            <img
              src="/Images/life2.avif"
              alt="Competitive Benefits"
              className="w-full h-[200px] lg:h-[370px] object-cover rounded-lg mb-4 lg:mb-8"
            />

            <h3 className="text-lg lg:text-xl xl:text-[34px] font-[dmedium] mb-2">
              Competitive Benefits
            </h3>

            <p className="text-[#5c5e62] leading-relaxed text-sm lg:text-base xl:text-xl font-[dregular]">
              We provide employees and their families benefits like medical, dental,
              vision coverage, 401(k) and generous paid time off from day one. With
              flexible scheduling, fitness resources and stock benefits for
              everyone, we invest in team members to help them do their best work.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LifeAtTesla;
