import ProfileCard from 'components/ProfileCard';
import React, { useEffect, useState } from 'react';
import { getAllProfiles } from 'services/globalService';
import "./Artists.css"

export default function Artists() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        getAllProfiles()
            .then(setProfiles)
            .catch(err => console.log(err))
    }, []);
    console.log(profiles)

    return (
        <div className='artist-profile-list'>
            {
                profiles.map((el) => {
                    return <ProfileCard profile={el} />
                })
            }
        </div>
    )
}