import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

import '../styles/Header.css'

function Header({ token, role, firstName, handleLogout }) {
    const userName = [
        role && firstName ? `${role}: ${firstName}` :
            role ? role :
                firstName
    ].filter(Boolean).join('') || '';

    return (
        <header className="header">
            <div className="static_line">
                <Link className="Logo" to="/">
                    <img alt="Silant logo" src={logo} className="logo"/>
                </Link>
                <div className="contact_info">
                    <span>
                        +7-8352-20-12-09
                    </span>
                    <span className="header_text">
                        Электронная сервисная книжка "Мой Силант"
                    </span>
                </div>
            </div>
            <div className="user_info">
                <span>{userName}</span>
                {!token ?
                    <Link className="btn-primary" to="/login">Авторизоваться</Link> :
                    <div className="buttonLogout">
                        <input
                            className="Logout"
                            type="submit"
                            name="submit"
                            value="Выйти"
                            onClick={handleLogout}
                        />
                    </div>
                }
            </div>
        </header>
    );
}

export default Header;