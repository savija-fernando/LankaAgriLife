import axios from "axios";

const API_URL = "http://localhost:8070/Animal";

export const getAllAnimals = () => axios.get(API_URL);
export const addAnimal = (data) => axios.post(`${API_URL}/add`, data);  
export const updateAnimal = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteAnimal = (id) => axios.delete(`${API_URL}/delete/${id}`);
