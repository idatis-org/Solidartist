import React from 'react';

export default function Dashboard() {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h1>Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <div>

                    <input type="file" placeholder='Imagen de perfil' />
                    <input type="file" placeholder='Imagen de perfil' />
                    <input type="textarea" placeholder='Descripcion' />
                </div>
                <button>Submit</button>

            </form>
        </>
    )
}