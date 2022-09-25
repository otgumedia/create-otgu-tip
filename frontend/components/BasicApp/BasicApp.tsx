import React, { useState } from "react";
import { Tip } from "../../near-interface";
import "./BasicApp.css";

const BasicApp = ({ tip, wallet }) => {
  const [amount, setAmount] = useState(0);

  const contract = new Tip({
    contractId: process.env.CONTRACT_NAME,
    walletToUse: wallet,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await contract.sendTip(amount);
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  return (
    <div className={`container`}>
      <h1>
        Welcome <br />
        {wallet.accountId}
      </h1>
      <form className={`form`} onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="tip">Tip</label>
        <input
          type="number"
          id="tip"
          value={amount > 0 ? amount : ""}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className={`form-btn`} type="submit">
          Tip
        </button>
      </form>
      <button onClick={() => wallet.signOut()}>Logout</button>
    </div>
  );
};

export default BasicApp;
