"use client";
import { useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Video/hero.webm" type="video/webm" />
      </video>

      {/* DARK OVERLAY (TESLA STYLE) */}
      <div className="absolute inset-0 bg-black/25" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col text-white text-center px-4 pt-32">

        <h1 className="text-4xl sm:text-5xl md:text-[64px] font-[dmedium]">
          Careers
        </h1>

        <p className=" text-sm sm:text-xl font-[dregular] tracking-wide">
          Build a World of Amazing Abundance
        </p>
      </div>

      {/* PAUSE / PLAY BUTTON */}
      <button
        onClick={toggleVideo}
        aria-label="Toggle video"
        className="absolute bottom-6 left-6 z-20 w-10 h-10 rounded-sm bg-white/20 flex items-center justify-center hover:bg-black/20 transition"
      >
        {paused ? (
          /* PLAY ICON */
          <svg
            viewBox="0 0 24 24"
            className=" text-white ml-[2px]"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M19.057 13.62 6.815 20.747c-1.248.72-2.808-.18-2.808-1.62V4.874c0-1.44 1.56-2.34 2.808-1.62l12.242 7.125c1.247.72 1.247 2.521 0 3.242z" />
          </svg>
        ) : (
          /* PAUSE ICON */
          <div className="flex gap-1">
            <span className="w-[3px] h-5 bg-white rounded-sm" />
            <span className="w-[3px] h-5 bg-white rounded-sm" />
          </div>
        )}
      </button>
    </section>
  );
}
