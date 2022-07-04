const API_URL = 'http://localhost:3030/api';

function registerBuyer(body) {
    return fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return true
    })
}

function registerArtist(body) {
    return fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return true
    })
}

export {registerBuyer, registerArtist}