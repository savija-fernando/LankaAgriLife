// src/api/inventoryAPI.js
import axios from "axios";

const API_URL = "http://localhost:8070/Inventory"; 

export const getAllInventory = () => axios.get(API_URL);
export const addInventory = (data) => axios.post(`${API_URL}/add`, data);
export const updateInventory = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteInventory = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const getLowStock = () => axios.get(`${API_URL}/low-stock`);
export const exportPDF = () => axios.get(`${API_URL}/export/pdf`, { responseType: "blob" });
