import React from "react";
import Form from "../common/Form.js";

function Step1({
  setStep,
  setShowGoogleSignIn,
  Unik,
  setIp,
  Ip,
  BusinessEmail,
  setBusinessEmail,
  setContinueWithFacebook,
}) {
  return (
    <Form
      setStep={setStep}
      setShowGoogleSignIn={setShowGoogleSignIn}
      Unik={Unik}
      setIp={setIp}
      Ip={Ip}
      BusinessEmail={BusinessEmail}
      setBusinessEmail={setBusinessEmail}
      setContinueWithFacebook={setContinueWithFacebook}
    />
  );
}

export default Step1;
