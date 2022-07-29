import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()


    const goToProfile = () => {
        navigate("/test")
    }

    return (
        <>
            HOME.
            <button onClick={goToProfile}>Go to TEST profile</button>
        </>
    );
}