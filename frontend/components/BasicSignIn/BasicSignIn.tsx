import React from "react";
import "./BasicSignIn.css";

const BasicSignIn = ({ wallet }) => {
  return (
    <div className={`container`}>
      <h1>Near Tip Starter</h1>
      <button onClick={() => wallet.signIn()}>Sign In HERE!</button>
    </div>
  );
};

export default BasicSignIn;
