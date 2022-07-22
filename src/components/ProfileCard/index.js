import React, { useEffect, useState } from 'react';
import { getAllProfiles } from 'services/globalService';
import "./ProfileCard.css"

export default function ProfileCard({ profile }) {


    return (
        <>
            <div className='profile-card-container'>
                <div className='profile-img-container'>
                    <img src={`http://localhost:3030/img/${profile && profile.user_img}`} width="200px" alt="profile_photo" />
                </div>
                <div className='profile-body-container'>
                    <p>{profile.username}</p>
                    <p>{profile.alias}</p>
                </div>
            </div>

        </>
    )
}