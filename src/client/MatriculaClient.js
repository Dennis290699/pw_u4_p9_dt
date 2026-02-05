import axios from "axios";
import { AuthorizationToken } from "./AuthorizationToken";

// Helper para manejar errores de axios
const handleAxiosError = (error) => {
    if (error.response) {
        // El servidor respondió con un estado fuera del rango 2xx
        console.error("Error Response:", error.response.data);
        console.error("Status:", error.response.status);

        if (error.response.status === 404) {
            throw new Error("Recurso no encontrado (404)");
        }
        if (error.response.status === 400) {
            throw new Error("Solicitud incorrecta. Verifique los datos (400)");
        }
        if (error.response.status === 409) {
            throw new Error("Conflicto: El registro ya existe o hay datos duplicados (409)");
        }
        if (error.response.status === 500) {
            throw new Error("Error interno del servidor (500)");
        }

        throw new Error(`Error del servidor: ${error.response.status}`);
    } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("Error Request:", error.request);
        throw new Error("No se pudo conectar con el servidor. Verifique su conexión.");
    } else {
        // Algo pasó al configurar la solicitud
        console.error("Error Message:", error.message);
        throw new Error(`Error inesperado: ${error.message}`);
    }
}

const consultarTodos = async () => {
    try {
        const response = await axios.get(`http://localhost:8081/matricula/api/v1.0/estudiantes`, { headers: { "Authorization": "Bearer " + AuthorizationToken.getToken() }, });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const consultarPorId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, { headers: { "Authorization": "Bearer " + AuthorizationToken.getToken() }, });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const guardar = async (body) => {
    try {
        const response = await axios.post("http://localhost:8081/matricula/api/v1.0/estudiantes", body, { headers: { "Authorization": "Bearer " + AuthorizationToken.getToken() }, });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const actualizar = async (id, body) => {
    try {
        const response = await axios.put(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body, { headers: { "Authorization": "Bearer " + AuthorizationToken.getToken() }, });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const actualizarParcial = async (id, body) => {
    try {
        const response = await axios.patch(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body, { headers: { "Authorization": "Bearer " + AuthorizationToken.getToken() }, });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const eliminar = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, { headers: { "Authorization": "Bearer " + AuthorizationToken.getToken() }, });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

export const consultarTodosFachada = async () => {
    return await consultarTodos();
}

export const consultarPorIdFachada = async (id) => {
    return await consultarPorId(id);
}

export const guardarFachada = async (body) => {
    return await guardar(body);
}

export const actualizarFachada = async (id, body) => {
    return await actualizar(id, body);
}

export const actualizarParcialFachada = async (id, body) => {
    return await actualizarParcial(id, body);
}

export const eliminarFachada = async (id) => {
    return await eliminar(id);
}

export const consumirUrl = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}
