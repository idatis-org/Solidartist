import Profile from "components/Profile";
import Dashboard from "components/Dashboard";
import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function ProfilePage() {
    const { alias } = useParams();
    const location = useLocation();

    //Shows the Dashboard or the Profile depending on the url and if the user is logged in or not
    const conditionalRendering = () => {
        return location.pathname === `/user/${alias}` ? <Dashboard /> : <Profile alias={alias} />
    }

    return (
        <>
            {conditionalRendering()}
        </>
    )
}