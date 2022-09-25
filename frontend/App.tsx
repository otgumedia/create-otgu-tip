import "regenerator-runtime/runtime";
import "./assets/global.css";
import React from "react";
import BasicSignIn from "./components/BasicSignIn/BasicSignIn";
import BasicApp from "./components/BasicApp/BasicApp";

const App = ({ isSignedIn, tip, wallet }) => {
  return (
    <div className="container">
      {!isSignedIn ? (
        <BasicSignIn wallet={wallet} />
      ) : (
        <BasicApp tip={tip} wallet={wallet} />
      )}
    </div>
  );
};

export default App;
