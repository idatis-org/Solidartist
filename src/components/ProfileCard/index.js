import React, { useEffect, useState } from 'react';
import { getAllProfiles } from 'services/globalService';
import { useNavigate } from 'react-router-dom';

import "./ProfileCard.css"

export default function ProfileCard({ profile }) {
    const navigate = useNavigate();

    return (
        <>
            <div className='profile-card-container' onClick={() => navigate('/' + profile.alias)}>
                <div className='profile-img-container'>
                    <img src={`https://pruebas-api.solidartist.org/img/${profile && profile.user_img}`} width="200px" alt="profile_photo" />
                </div>
                <div className='profile-body-container'>
                    <p>{profile.username}</p>
                    <p>{profile.alias}</p>
                </div>
            </div>

        </>
    )
}