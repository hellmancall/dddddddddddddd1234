import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

function FlagIcon({ countryCode, alt }) {
  const [failed, setFailed] = useState(false);
  const code = (countryCode || "").toLowerCase();

  if (!code || failed) {
    return <span className="text-[14px] leading-none">🌐</span>;
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={alt}
      className="h-4 w-5 rounded-[1px] object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function GooglePhoneField({
  countries,
  selectedCountryCode,
  onSelectCountry,
  phoneNumber,
  onChangePhoneNumber,
  disabled = false,
  error = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState(288);
  const [dropdownPosition, setDropdownPosition] = useState({
    left: 0,
    top: 0,
    width: 320,
  });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const sortedCountries = useMemo(
    () => [...countries].sort((a, b) => a.name.localeCompare(b.name)),
    [countries]
  );

  const selectedCountry = useMemo(
    () =>
      sortedCountries.find((country) => country.code === selectedCountryCode) ||
      sortedCountries[0],
    [sortedCountries, selectedCountryCode]
  );

  const hasValue = Boolean(phoneNumber);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedTrigger =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const clickedMenu =
        menuRef.current && menuRef.current.contains(event.target);

      if (!clickedTrigger && !clickedMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const updateDropdownPosition = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - 16;
      const spaceAbove = rect.top - 16;
      const shouldOpenUpwards = spaceBelow < 260 && spaceAbove > spaceBelow;
      const availableSpace = shouldOpenUpwards ? spaceAbove : spaceBelow;
      const width = Math.min(320, window.innerWidth - 32);
      const maxLeft = Math.max(16, window.innerWidth - width - 16);
      const left = Math.min(Math.max(16, rect.left), maxLeft);
      const top = shouldOpenUpwards
        ? Math.max(16, rect.top - 8)
        : rect.bottom + 8;

      setOpenUpwards(shouldOpenUpwards);
      setDropdownMaxHeight(Math.max(180, Math.min(320, availableSpace)));
      setDropdownPosition({ left, top, width });
    };

    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);
    window.addEventListener("scroll", updateDropdownPosition, true);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    };
  }, [isOpen]);

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="flex items-center gap-3">
        <div className="relative shrink-0" ref={triggerRef}>
          <button
            type="button"
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            className="flex h-[58px] w-12 items-center justify-center gap-1 rounded-[2px] bg-white disabled:cursor-not-allowed"
            disabled={disabled}
            aria-label="Select country"
          >
            <FlagIcon
              countryCode={selectedCountry?.code}
              alt={selectedCountry?.name || "Country"}
            />
            <svg
              className={`h-3.5 w-3.5 text-[#5f6368] transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

        </div>

        <div className="g-input-wrapper mb-0 flex-1 font-helvetica">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) =>
              onChangePhoneNumber(
                e.target.value.replace(/[^\d\s()+-]/g, "")
              )
            }
            inputMode="tel"
            autoComplete="tel"
            placeholder=" "
            className={`g-input ${error ? "redborder" : ""}`}
            disabled={disabled}
          />
          <label className="g-label">Phone number</label>
        </div>
      </div>
      {isOpen && !disabled && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              className="fixed z-[10001] overflow-y-auto rounded-xl border border-[#dadce0] bg-white py-2 shadow-[0_8px_24px_rgba(60,64,67,0.24)]"
              style={{
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                maxHeight: `${dropdownMaxHeight}px`,
                top: openUpwards ? "auto" : `${dropdownPosition.top}px`,
                bottom: openUpwards
                  ? `${Math.max(16, window.innerHeight - dropdownPosition.top)}px`
                  : "auto",
              }}
            >
              {sortedCountries.map((country) => {
                const isSelected = country.code === selectedCountryCode;

                return (
                  <button
                    key={`${country.code}-${country.dialCode}`}
                    type="button"
                    onClick={() => {
                      onSelectCountry(country.code);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2 text-left ${
                      isSelected ? "bg-[#e8f0fe]" : "hover:bg-[#f8f9fa]"
                    }`}
                  >
                    <span className="flex w-6 shrink-0 justify-center">
                      <FlagIcon countryCode={country.code} alt={country.name} />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-[#202124]">
                      {country.name}
                    </span>
                    <span className="shrink-0 text-sm text-[#5f6368]">
                      {country.dialCode}
                    </span>
                  </button>
                );
              })}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

export default GooglePhoneField;
