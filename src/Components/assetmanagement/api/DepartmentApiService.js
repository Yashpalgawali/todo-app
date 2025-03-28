import { apiClient } from "./ApiClient";

export const getAllDepartments = ()=> apiClient.get('/department/')

export const getDepartmentById = (id)=> apiClient.get(`/department/${id}`)