import { API_URL } from './settings'


function getProfile(alias){
    return fetch(`${API_URL}/user/${alias}`)
    .then(res =>{
        if (!res.ok) throw new Error(res.error);
        return res.json()
    })
    .then(res => (res.data))
}

export {
    getProfile
}