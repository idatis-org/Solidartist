import { API_URL } from './settings'


function getAllCategories() {
    return fetch(`${API_URL}/art/categories/all`)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function newArt(body) {
    return fetch(`${API_URL}/art/new`, {
        method: 'POST',
        body: body
    })
        .then(res => {
            if (!res.ok) res.data = "Error al insertar";
            return res.json()
        })
        .then(res => (res.data))
}

function getAllArt() {
    return fetch(`${API_URL}/art/art_piece/all`)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}


export {
    getAllCategories,
    newArt,
    getAllArt,
}