import React from "react";
import "./Navbar.css";
import Logo from "../../Images/logo.svg";
import { Link } from "react-router-dom";
import AppContext from "../../Contexts/AppContext";
import { useContext } from "react";

export default function Navbar() {
    const {user, logout} = useContext(AppContext); // Tämä on se user, joka on kirjautunut sisään
    return (
        <div className="navbar">
          <img src={Logo} className="navbar__logo" alt="logo" />

          <ul className="navbar__list">
            <li className="navbar__item">
                <Link to="/" className="navbar__link">TurttiHome</Link>
            </li>
           {!user ? (
                <li className="navbar__item navbar__submenu-container">
                    <button className="navbar__link">Tilinhallinta</button>
                    <ul className="navbar__submenu">
                        <li className="navbar__submenu-item">
                            <Link to="/auth/login" className="navbar__submenu-link">Sisäänkirjautuminen</Link>
                        </li>
                        <li className="navbar__submenu-item">
                            <Link to="/auth/register" className="navbar__submenu-link">Rekisteröinti</Link>
                        </li>
                    </ul>
                </li>
            ) : (
                <li className="navbar__item navbar__submenu-container">
                    <button className="navbar__link">{user.name}</button>
                    <ul className="navbar__submenu">
                        <li className="navbar__submenu-item">
                            <Link to="/profile" className="navbar__submenu-link">Profiili</Link>
                        </li>
                        <li className="navbar__submenu-item">
                            <button onClick={logout} className="navbar__submenu-link">Uloskirjautuminen</button>
                        </li>
                    </ul>
                </li>
            )}
          </ul> {/* This is the missing closing </ul> tag */}
        </div>
    );
}
