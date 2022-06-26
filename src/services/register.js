const API_URL = 'http://localhost:3000/api/';

function registerBuyer({ username, password }) {
    return fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return true
    })
}

function registerArtist({ username, password }) {
    return fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return true
    })
}

export {registerBuyer, registerArtist}