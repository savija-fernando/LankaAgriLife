import axios from "axios";

const API_URL = "http://localhost:8070/Product"; 

export const getAllProduct = () => axios.get(API_URL);
export const addProduct = (data) => axios.post(`${API_URL}/add`, data);
export const updateProduct  = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteProductItem  = (id) => axios.delete(`${API_URL}/delete/${id}`);

 