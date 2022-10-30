import { API_URL } from './settings'

export default function LoginService(username, password) {
    return fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(username, password)
    }).then(res => {
        if (!res.ok) throw new Error(res.error)
        return res.json();
    }).then(res => {
        const { token } = res;
        return token;
    })
}
