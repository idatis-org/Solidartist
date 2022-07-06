import Profile from "components/Profile";
import React from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
    const { alias } = useParams();

    return (
        <Profile alias={alias} />
    )
}