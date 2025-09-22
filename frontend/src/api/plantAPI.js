import axios from "axios";

const API_URL = "http://localhost:8070/Plant";

export const getAllPlants = () => axios.get(API_URL);
export const addPlant = (data) => axios.post(`${API_URL}/add`, data);
export const updatePlant = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deletePlant = (id) => axios.delete(`${API_URL}/delete/${id}`);
