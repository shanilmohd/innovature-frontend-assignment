// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:7000/';

export const getEmployees = () => axios.get(`${API_URL}/employees`);
export const addEmployee = (employee) => axios.post(`${API_URL}/employee`, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/employee/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employee/${id}`);
