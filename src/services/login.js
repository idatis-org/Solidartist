import { API_URL } from './settings'

export default function LoginService(username, password) {
    return fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(res => {
        if (!res.ok){ 
            if (res.status === 403){
                throw new Error('Usuario Reportado, por favor pongase en contacto con nosotros');
            }
            else
                throw new Error('Revisa los campos e intentalo de nuevo')
        }
        return res.json();
    }).then(res => {
        const { token } = res;
        return token;
    })
}
