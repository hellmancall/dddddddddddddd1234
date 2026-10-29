import React, { useState } from "react";

const ApplicationComplete = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    cvFile: null
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

      if (!validTypes.includes(fileExtension)) {
        setErrors(prev => ({ ...prev, cvFile: "Please upload a PDF or Word document" }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cvFile: "File size must be less than 5MB" }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        cvFile: file
      }));
      setErrors(prev => ({ ...prev, cvFile: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowSuccessModal(true);
    }
  };

  const handleDoneClick = () => {
    setShowSuccessModal(false);
    window.location.href = 'https://www.apple.com/';
  };

  return (
    <>
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes check {
          0% {
            stroke-dasharray: 0, 100;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 100, 0;
            stroke-dashoffset: 0;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-check {
          animation: check 0.6s ease-out 0.2s backwards;
        }

        /* Dark calendar icon for date input on white background */
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.7;
        }

        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }

        /* Firefox date input styling */
        input[type="date"]::-moz-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.7;
        }

        /* Ensure date input text is visible on white */
        input[type="date"]::-webkit-datetime-edit {
          color: #374151;
        }

        input[type="date"]::-webkit-datetime-edit-fields-wrapper {
          color: #374151;
        }

        input[type="date"]::-webkit-datetime-edit-text {
          color: #6b7280;
        }

        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field {
          color: #374151;
        }

        /* Placeholder styling for empty date inputs */
        input[type="date"]:not(:focus):invalid {
          color: #9ca3af;
        }
      `}</style>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-10 md:p-14 max-w-lg w-full animate-slide-up">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6">
                <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-green-600 animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-[dmedium] text-gray-900 mb-4 uppercase tracking-wide">
                Application Submitted!
              </h3>

              <p className="text-gray-900 text-lg mb-3 font-[dmedium]">
                Thank you for applying to Apple.
              </p>

              <p className="text-gray-600 text-base mb-8 max-w-md font-[dregular]">
                Your application has been received successfully. Our recruitment team will review it and get back to you soon.
              </p>

              <button
                onClick={handleDoneClick}
                className="rounded-full font-[dmedium] bg-gray-900 border-2 border-gray-900 text-white text-base py-4 px-10 hover:bg-gray-800 hover:border-gray-800 active:scale-95 transition-all duration-200 uppercase tracking-wide"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="relative w-full min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-white font-[dmedium]">
        <div className="relative z-10 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-8 mt-16 sm:mt-0">
            <div className="items-center justify-center mx-auto mb-12">
              <svg className="tds-icon tds-icon-logo-wordmark tds-site-logo-icon" height={32} viewBox="0 0 342 35" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7M308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7"></path></svg>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 uppercase tracking-wide text-gray-900">
              Complete Your Application
            </h2>

            <p className="text-gray-600 text-sm sm:text-base font-[dregular]">
              Please fill in your details to complete your application
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-900 text-xs sm:text-sm font-[dmedium] mb-1.5 sm:mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full font-[dregular] py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border-2 ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} text-gray-900 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none transition-all duration-200`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-gray-900 text-xs sm:text-sm font-[dmedium] mb-1.5 sm:mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full font-[regular] py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border-2 ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} text-gray-900 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none transition-all duration-200`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="mb-3 sm:mb-4">
              <label htmlFor="email" className="block text-gray-900 text-xs sm:text-sm font-[dmedium] mb-1.5 sm:mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full py-2.5 font-[regular] sm:py-3 px-3 sm:px-4 rounded-lg border-2 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} text-gray-900 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none transition-all duration-200`}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-3 sm:mb-4">
              <label htmlFor="birthday" className="block text-gray-900 text-xs sm:text-sm font-[dmedium] mb-1.5 sm:mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className={`w-full py-2.5 font-[regular] sm:py-3 px-3 sm:px-4 rounded-lg border-2 ${errors.birthday ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} text-gray-900 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none transition-all duration-200`}
              />
              {errors.birthday && <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>}
            </div>

            <div className="mb-4 sm:mb-6">
              <label htmlFor="cvFile" className="block text-gray-900 text-xs sm:text-sm font-[dmedium] mb-1.5 sm:mb-2">
                Upload CV (PDF or Word)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="cvFile"
                  name="cvFile"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="cvFile"
                  className={`w-full font-[regular] py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border-2 ${errors.cvFile ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} text-gray-700 text-sm flex items-center justify-between cursor-pointer hover:border-gray-900 transition-all duration-200`}
                >
                  <span className="truncate">{formData.cvFile ? formData.cvFile.name : 'Choose file...'}</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </label>
              </div>
              {errors.cvFile && <p className="text-red-500 text-xs mt-1">{errors.cvFile}</p>}
              <p className="text-gray-500 text-xs font-[dregular] mt-1">Maximum file size: 5MB</p>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gray-900 border-2 border-gray-900 text-white text-sm sm:text-base font-[dmedium] py-3 sm:py-4 px-4 sm:px-6 hover:bg-gray-800 hover:border-gray-800 active:scale-98 transition-all duration-200 uppercase tracking-wide"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ApplicationComplete;