import axios from "axios";

const API_URL = "http://localhost:8070/compostHandler";


export const getAllCompostHandlers = () => axios.get(API_URL);
export const addCompostHandler = (data) => axios.post(`${API_URL}/add`, data);
export const updateCompostHandler = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteCompostHandler = (id) => axios.delete(`${API_URL}/delete/${id}`);
