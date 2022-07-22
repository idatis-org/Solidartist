import { API_URL } from './settings';

function getAllProfiles() {
    return fetch(`${API_URL}/all/get/artists`)
        .then(res => {
            if (!res.ok) throw new Error(res.error);
            return res.json()
        })
        .then(res => (res.data))
}


export {
    getAllProfiles,
}