// src/api/inventoryAPI.js
import axios from "axios";

const API_URL = "http://localhost:8070/Revenue";

export const getAllRevenue = () => axios.get(API_URL);
export const addRevenue = (data) => axios.post(`${API_URL}/add`, data);
export const updateRevenue = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteRevenue = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const Revenuepdfgenerator  = () => axios.get(`${API_URL}/report`, { responseType: "blob" });
