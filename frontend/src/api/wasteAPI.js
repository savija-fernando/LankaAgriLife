import axios from "axios";

const API_URL = "http://localhost:8070/waste"; // adjust if your backend URL/port is different

// Get all waste records
export const getAllWaste = () => axios.get(`${API_URL}/`);

// Add a new waste record
export const addWaste = (data) => axios.post(`${API_URL}/add`, data);

// Update a waste record by MongoDB _id
export const updateWaste = (id, data) => axios.put(`${API_URL}/update/${id}`, data);

// Delete a waste record by MongoDB _id
export const deleteWaste = (id) => axios.delete(`${API_URL}/delete/${id}`);
