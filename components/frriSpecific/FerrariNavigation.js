"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BMWNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bg = darkMode ? "bg-[#12131f]" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-[#1a1a2e]";
  const dividerColor = darkMode ? "border-white/15" : "border-gray-200";
  const logoColor = darkMode ? "fill-white" : "fill-[#1a1a2e]";

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? (darkMode ? "bg-[#0d0e1a]/95 backdrop-blur-sm shadow-lg" : "bg-white/95 backdrop-blur-sm shadow-md") : bg
        }`}
      >
        {!scrolled ? (
          /* ── TWO-ROW LAYOUT (at top) ─────────────────────── */
          <div>
            {/* Row 1: Logos + Theme Toggle */}
            <div className="w-full max-w-[96%] mx-auto flex items-center justify-between py-4">
              <div className="flex items-center gap-5">
                <BMWGroupLogo logoColor={logoColor} />
                <div className={`w-px h-8 ${darkMode ? "bg-white/25" : "bg-gray-300"}`} />
                <BMWCircleLogo />
                <MiniLogo darkMode={darkMode} />
                <RollsRoyceLogo logoColor={logoColor} />
              </div>
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>

            {/* Divider */}
            <div className={`border-t ${dividerColor} w-full`} />

            {/* Row 2: Nav Items + Search */}
            <div className="w-full max-w-[96%] mx-auto flex items-center justify-between py-3">
              <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                  <NavItem key={item.label} label={item.label} href={item.href} darkMode={darkMode} />
                ))}
              </nav>
              <SearchButton darkMode={darkMode} />
            </div>
          </div>
        ) : (
          /* ── SINGLE-ROW LAYOUT (scrolled) ───────────────── */
          <div className="w-full max-w-[96%] mx-auto flex items-center justify-between py-3">
            {/* Logos */}
            <div className="flex items-center gap-4">
              <BMWGroupLogo logoColor={logoColor} />
              <div className={`w-px h-6 ${darkMode ? "bg-white/25" : "bg-gray-300"}`} />
              <BMWCircleLogo small />
              <MiniLogo darkMode={darkMode} small />
              <RollsRoyceLogo logoColor={logoColor} small />
            </div>

            {/* Nav Items (hidden on mobile) */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavItem key={item.label} label={item.label} href={item.href} darkMode={darkMode} small />
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden text-sm font-medium px-2 py-1 rounded ${textColor}`}
            >
              Menu
            </button>
          </div>
        )}
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[60] md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`fixed right-0 top-0 bottom-0 w-[80%] z-[70] md:hidden overflow-y-auto ${
              darkMode ? "bg-[#12131f]" : "bg-white"
            }`}
            style={{ animation: "slideInRight 0.3s ease-out" }}
          >
            <div className="p-6">
              <button onClick={() => setMenuOpen(false)} className={`mb-8 text-xl ${textColor}`}>
                ✕
              </button>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium px-3 py-2.5 rounded transition-colors ${
                      darkMode ? "text-white hover:bg-white/10" : "text-[#1a1a2e] hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

/* ─── DATA ──────────────────────────────────────────────── */
const navItems = [
  { label: "Our Locations Worldwide", href: "#" },
  { label: "Our Trainee Programme", href: "#" },
  { label: "Application Tips", href: "#" },
  { label: "Benefits", href: "#" },
  { label: "Our Corporate Culture", href: "#" },
];

/* ─── NAV ITEM ───────────────────────────────────────────── */
function NavItem({ label, href, darkMode, small }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap transition-colors duration-200 px-3 py-1.5 rounded-sm ${
        small ? "text-[13px]" : "text-[13.5px]"
      } font-medium ${
        darkMode
          ? "text-white/85 hover:text-white hover:bg-white/10"
          : "text-[#1a1a2e]/80 hover:text-[#1a1a2e] hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}

/* ─── SEARCH BUTTON ──────────────────────────────────────── */
function SearchButton({ darkMode }) {
  return (
    <button
      className={`flex items-center gap-2 text-[13.5px] font-medium px-3 py-1.5 rounded-sm transition-colors ${
        darkMode
          ? "text-white/85 hover:text-white hover:bg-white/10"
          : "text-[#1a1a2e]/80 hover:text-[#1a1a2e] hover:bg-gray-100"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      Search
    </button>
  );
}

/* ─── THEME TOGGLE ───────────────────────────────────────── */
function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle theme"
      className={`flex items-center rounded-full p-0.5 w-[68px] h-[34px] relative transition-colors duration-300 ${
        darkMode ? "bg-[#2a2b3d] border border-white/20" : "bg-gray-100 border border-gray-300"
      }`}
    >
      {/* Sliding pill */}
      <span
        className={`absolute w-[28px] h-[28px] rounded-full transition-all duration-300 ${
          darkMode
            ? "translate-x-[2px] bg-[#3c3e58]"
            : "translate-x-[34px] bg-white shadow"
        }`}
      />
      {/* Moon icon */}
      <span className={`relative z-10 flex-1 flex justify-center transition-opacity ${darkMode ? "opacity-100" : "opacity-40"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={darkMode ? "white" : "#555"}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
      {/* Sun icon */}
      <span className={`relative z-10 flex-1 flex justify-center transition-opacity ${!darkMode ? "opacity-100" : "opacity-40"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={!darkMode ? "#333" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>
    </button>
  );
}

/* ─── LOGOS ──────────────────────────────────────────────── */
function BMWGroupLogo({ logoColor }) {
  return (
    <div className={`flex flex-col leading-[1.15] ${logoColor === "fill-white" ? "text-white" : "text-[#1a1a2e]"}`}>
      <span className="text-[13px] font-bold tracking-[0.08em] uppercase">BMW</span>
      <span className="text-[13px] font-bold tracking-[0.08em] uppercase">GROUP</span>
    </div>
  );
}

function BMWCircleLogo({ small }) {
  const size = small ? 28 : 34;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#1c69d4" stroke="white" strokeWidth="2" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#8a8a8a" strokeWidth="2" />
      {/* BMW Roundel quarters */}
      <path d="M50 2 A48 48 0 0 1 98 50 L50 50 Z" fill="white" />
      <path d="M50 50 L98 50 A48 48 0 0 1 50 98 Z" fill="#1c69d4" />
      <path d="M50 98 A48 48 0 0 1 2 50 L50 50 Z" fill="white" />
      <path d="M50 50 L2 50 A48 48 0 0 1 50 2 Z" fill="#1c69d4" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#8a8a8a" strokeWidth="3" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#8a8a8a" strokeWidth="2.5" />
      {/* BMW Text */}
      <text x="50" y="82" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial" letterSpacing="1">BMW</text>
    </svg>
  );
}

function MiniLogo({ darkMode, small }) {
  const size = small ? 28 : 34;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill={darkMode ? "#1a1a2e" : "#f5f5f5"} stroke={darkMode ? "#555" : "#aaa"} strokeWidth="2" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={darkMode ? "#888" : "#aaa"} strokeWidth="2" />
      {/* Wings */}
      <path d="M14 50 C20 38 30 32 50 30 C70 32 80 38 86 50 C80 62 70 68 50 70 C30 68 20 62 14 50Z" fill={darkMode ? "#333" : "#ddd"} />
      <path d="M18 50 C24 40 33 34 50 33 C67 34 76 40 82 50 C76 60 67 66 50 67 C33 66 24 60 18 50Z" fill={darkMode ? "#222" : "#eee"} />
      {/* MINI Text */}
      <text x="50" y="54" textAnchor="middle" fill={darkMode ? "white" : "#333"} fontSize="11" fontWeight="bold" fontFamily="Arial" letterSpacing="1.5">MINI</text>
    </svg>
  );
}

function RollsRoyceLogo({ logoColor, small }) {
  const isLight = logoColor === "fill-white";
  const textColor = isLight ? "white" : "#1a1a2e";
  const subColor = isLight ? "rgba(255,255,255,0.6)" : "#888";
  return (
    <div className="flex flex-col leading-[1.1]">
      <span style={{ color: textColor, fontSize: small ? "7px" : "8px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
        ROLLS-ROYCE
      </span>
      <span style={{ color: subColor, fontSize: small ? "5.5px" : "6.5px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        MOTOR CARS LTD
      </span>
    </div>
  );
}