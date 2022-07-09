import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "hooks/useUser";
import "./Header.css"

export default function Header() {
    const { isLogged, logout } = useUser()
    
    const handleClick = e => {
        e.preventDefault()
        logout()
    }

    //Changes the Login button for a Log out button depending on the state
    const renderLoginButton = () => {
        return !isLogged ?
            <>
                <Link to="/login">
                    Login
                </Link>
                <Link to="/register">
                    Register
                </Link>
            </>
            : <Link to="#" onClick={handleClick}>
                Log out
            </Link>
    }

    const content = renderLoginButton()

    return (
        <header className="f-header">
            {content}
        </header>
    );
}