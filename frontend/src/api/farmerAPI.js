import axios from "axios";

const API_URL = "http://localhost:8070/farmer"; // Update the port/path if needed


export const getAllFarmers = () => axios.get(`${API_URL}/`);
export const addFarmer = (data) => axios.post(`${API_URL}/add`, data);
export const updateFarmer = (farmer_id, data) => axios.put(`${API_URL}/update/${farmer_id}`, data);
export const deleteFarmer = (farmer_id) => axios.delete(`${API_URL}/delete/${farmer_id}`);
