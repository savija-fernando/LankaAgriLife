import axios from "axios";

const API_URL = "http://localhost:8070/LivestockHandler"; 

export const getAllLivestock = () => axios.get(API_URL);
export const addLivestock = (data) => axios.post(`${API_URL}/add`, data);
export const updateLivestockItem  = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteLivestockItem  = (id) => axios.delete(`${API_URL}/delete/${id}`);

 