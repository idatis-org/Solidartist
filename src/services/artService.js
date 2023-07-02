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

}

function getAllArt() {
    return fetch(`${API_URL}/art/art_piece/all`)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function getCurrentOwner() {
    return fetch(`${API_URL}/art/users_pieces/all`)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function getPieceAssociatedUsers(id) {
    return fetch(`${API_URL}/art/users_pieces/` + id)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function getPieceById(id) {
    return fetch(`${API_URL}/art/piece/` + id)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function getCollectionById(id) {
    return fetch(`${API_URL}/art/piece/collection/` + id)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}

function getCategoriesById(id) {
    return fetch(`${API_URL}/art/piece/category/` + id)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}


function editOwner(body) {
    return fetch(`${API_URL}/art/edit`, {
        method: 'POST', //Lo hago con post porque con PUT me daba problemas
        headers: { //Header para indicar que pasaremos un JSON
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body) //Se convierte en json 
    })
        .then(res => {
            //Se convierte a json la respuesta para poder leerla como objeto despues
            return res.json();
        })

}


function deleteArtById(idPiece) {
    return fetch(`${API_URL}/art/piece/${idPiece}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(res => res.data);
  }
  

export {
    getAllCategories,
    newArt,
    getAllArt,
    getCurrentOwner,
    getPieceById,
    getCollectionById,
    getCategoriesById,
    getPieceAssociatedUsers,
    editOwner,
    deleteArtById
}