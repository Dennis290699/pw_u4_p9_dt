import axios from "axios";

const defaultToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJtYXRyaWN1bGEtYXV0aCIsInN1YiI6ImFkbWluIiwiZ3JvdXBzIjpbImFkbWluIl0sImlhdCI6MTc3MDI0ODMwOCwiZXhwIjoxNzcwMjUxOTA4LCJqdGkiOiJiYTYwZGUyMS04MTBhLTQ3NGUtODcyYi1hOTQwMjMxMWUxYjUifQ.TyJ6a_U5LeUTIolSFh2_D1V0C0JVY7zhpNzHHHM8mHQ2wJixyyKDn1zzBGtnuOr5r1frJ3_fbMcr_9exTyJo9zruelTmD5XEqy0y5unP6DU3CAM6R4p5eXzTgs4N_qN0arOarZgc-Gbgxy5QaFjF8caVoEHdv-25ioSbGV5-Cms4oOlAo8HQVUH9v4Q-s-lRlhIfkepiAwPb1xzT53XnTXKo9eSsqjjAoyemWbyCuwb6Fw1tUOmZ4sMUgAgJWGBM1JSBEKApVHRjneJapaBrtCbz1fDnDFyEhQxg1s_z4KXwl9Nyg_7aZ81Ws8mmhHY8Os9pc96s4GIglOB-b3hR-Q";

let currentToken = defaultToken;

const generarToken = async (username = "admin", password = "admin") => {
    const body = {
        username: username,
        password: password
    };
    try {
        const response = await axios.get(`/auth/token?user=${username}&password=${password}`);
        if (response.data && response.data.token) {
            if (typeof response.data === 'string') {
                currentToken = response.data;
            } else {
                currentToken = response.data.token || response.data;
            }
            console.log("Token generado exitosamente");
        }
    } catch (error) {
        console.error("Error al generar token. Usando token por defecto.", error);
        // Mantiene el defaultToken
    }
}

const getToken = () => {
    return currentToken;
}

export const AuthorizationToken = {
    generarToken,
    getToken
};
