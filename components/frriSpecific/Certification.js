import React from "react";

const JoinUsHero = () => {
  return (
    <section className="relative w-full h-screen min-h-[400px] lg:min-h-[500px] overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <img
        src="/Images/join1..avif"
        alt="Join Us"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex h-full justify-center text-center px-4 lg:px-6 pt-[6rem] lg:pt-[7.5rem]">
        <div className="max-w-2xl text-white">

          <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-[64px] font-[dmedium] mb-2">
            Join Us
          </h1>

          <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl mb-4 lg:mb-6 font-[dmedium]">
            Help us build a world of amazing abundance.
          </p>

          <a
            href="#form"
            className="inline-flex items-center justify-center bg-[#3b5cff] hover:bg-[#2f4de0] transition-colors text-white font-[dmedium] px-10 lg:px-14 py-[8px] lg:py-[10px] rounded-sm text-xs lg:text-sm"
          >
            Explore Jobs
          </a>

        </div>
      </div>
    </section>
  );
};

export default JoinUsHero;
