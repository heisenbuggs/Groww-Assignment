import React from "react";
import "../styles/Appbar.css";
import brand from "../assets/Groww-Logo.png";

const Appbar = () => {
  return (
    <nav className="appbar">
      <img src={brand} height="40" width="150" alt="logo" className="logo"/>
    </nav>
  );
};

export default Appbar;
