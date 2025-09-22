import axios from "axios";

const API_URL = "http://localhost:8070/harvest";

export const getAllHarvests = () => axios.get(API_URL);
export const addHarvest = (data) => axios.post(`${API_URL}/add`, data);
export const updateHarvest = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteHarvest = (id) => axios.delete(`${API_URL}/delete/${id}`);
