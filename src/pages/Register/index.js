import React, { useState } from 'react';
import RegisterArtist from 'components/RegisterForm/RegisterArtist';
import RegisterBuyer from 'components/RegisterForm/RegisterBuyer';
import './Register.css';

export default function RegisterPage() {
    const [option, setOption] = useState(false);

    const handleButtonClick = (isOption) => {
        setOption(isOption);
    };

    const getButtonClassName = (isOption) => {
        return option === isOption ? 'active' : '';
    };

    const register = option ? <RegisterBuyer /> : <RegisterArtist />;

    return (
        <>
            <h1>¡Bienvenido!</h1>
            <h2 className='custom'>Antes de empezar, quieres registrarte como:</h2>
            <div className="button-class">
                <button
                    className={getButtonClassName(false)}
                    onClick={() => handleButtonClick(false)}
                >
                    <span>Artista</span>
                </button>
                <button
                    className={getButtonClassName(true)}
                    onClick={() => handleButtonClick(true)}
                >
                    <span>Comprador</span>
                </button>
            </div>
            {register}
        </>
    );
}

