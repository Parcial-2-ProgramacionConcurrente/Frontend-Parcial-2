// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
        console.log("Respuesta completa del backend en loginUser:", response); // Log para verificar respuesta completa
        return response.data;
    } catch (error) {
        console.error('Error en el login:', error.response?.data || error.message);
        throw error;
    }
};

export const api = axios.create({
    baseURL: API_BASE_URL, // Reemplaza con la URL de tu backend
});


export const registerUser = (registerData) => {
    return axios.post(`${API_BASE_URL}/api/auth/register`, registerData);
};

export const getEvents = () => {
    return axios.get(`${API_BASE_URL}/eventos`);
};
