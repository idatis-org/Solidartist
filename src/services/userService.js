import { API_URL } from './settings'


function getProfile(alias) {
    return fetch(`${API_URL}/user/${alias}`)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function getCreatorArt(id) {
    return fetch(`${API_URL}/user/art/creator/${id}`)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function getOwnerArt(id) {
    return fetch(`${API_URL}/user/art/owner/${id}`)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function editProfile(body) {
    return fetch(`${API_URL}/user/edit`, {
        method: 'PUT',
        body: body
    })
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

export {
    getProfile,
    getCreatorArt,
    getOwnerArt,
    editProfile
}