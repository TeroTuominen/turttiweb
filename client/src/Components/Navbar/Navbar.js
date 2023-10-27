import React from "react";
import "./Navbar.css";
import Logo from "../../Images/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
          <img src={Logo} className="navbar__logo" alt="logo" />

          <ul className="navbar__list">
            <li className="navbar__item">
                <Link to="/" className="navbar__link">TurttiHome</Link>
                </li>
          <li className="navbar__item navbar__submenu-container">
            <button className="navbar__link">Account</button>
            <ul className="navbar__submenu">
              <li className="navbar__submenu-item">
                <Link to="/auth/login" className="navbar__submenu-link">Sisäänkirjautuminen</Link>
              </li>
              <li className="navbar__submenu-item">
                <Link to="/auth/register" className="navbar__submenu-link">Rekisteröinti</Link>
              </li>
            </ul>
          </li>
          </ul>

        </div>
    );
}