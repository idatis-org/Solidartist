import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "hooks/useUser";
import "./Header.css"

export default function Header() {
    const { isLogged, logout, userInfo } = useUser()

    const handleLogout = e => {
        logout()
    }

    const handleProfile = () => {

    }

    //Changes the Login button for a Log out button depending on the state
    const renderLoginButton = () => {
        return !isLogged ?
            <>
                <li>
                    <Link className="navbar-link" to="/artists">
                        Artists
                    </Link>
                </li>
                <li>
                    <Link className="navbar-link" to="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="navbar-link" to="/register">
                        Register
                    </Link>
                </li>
            </>
            : <>
                <li>
                    <Link className="navbar-link" to="/artists">
                        Artists
                    </Link>
                </li>
                <li>
                    <Link className="navbar-link" to={`/user/${userInfo && userInfo.alias}`} onClick={handleProfile}>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="/" className="navbar-link" onClick={handleLogout}>
                        Log out
                    </Link>
                </li>
            </>
    }

    const content = renderLoginButton()

    return (
        <header className="f-header">
            <nav>
                <div className="menu-icon">

                </div>
                <div className="logo">
                    {/* <img src="imgs/invert-logo-webion.webp" alt="logo" /> */}
                    <Link className="navbar-link" to="/">HOME</Link>
                </div>
                <div className="menu">
                    <ul>
                        {content}
                    </ul>
                </div>
            </nav>
        </header>
    );
}