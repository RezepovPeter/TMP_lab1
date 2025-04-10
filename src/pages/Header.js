import React from "react";
import logo from "./assets/ManagementCompanyLogo.png";
import "./styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div>PF-manager</div>
      <img src={logo} alt="Management Company Logo" />
    </div>
  );
};

export default Header;
