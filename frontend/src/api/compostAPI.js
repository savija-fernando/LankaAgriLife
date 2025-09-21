import axios from 'axios';

const BASE_URL = 'http://localhost:8070/compost'; // adjust if needed

// Get all compost items
export const getAllCompost = () => {
  return axios.get(`${BASE_URL}/`);
};

// Add a new compost item
export const addCompost = (data) => {
  return axios.post(`${BASE_URL}/add`, data);
};

// Update compost by compost_id
export const updateCompost = (compost_id, data) => {
  return axios.put(`${BASE_URL}/update/${compost_id}`, data);
};

// Delete compost by compost_id
export const deleteCompostItem = (compost_id) => {
  return axios.delete(`${BASE_URL}/delete/${compost_id}`);
};
