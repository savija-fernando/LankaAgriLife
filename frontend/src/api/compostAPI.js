import axios from "axios";

const API_URL = "http://localhost:8070/compost";

export const getAllCompost = () => axios.get(API_URL);
export const addCompost = (data) => axios.post(`${API_URL}/add`, data);
export const updateCompost = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const deleteCompost = (id) => axios.delete(`${API_URL}/delete/${id}`);
