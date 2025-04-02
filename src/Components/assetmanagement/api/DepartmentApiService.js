import { apiClient } from "./ApiClient";

export const getAllDepartments = ()=> apiClient.get('/department/')

export const getDepartmentById = (id)=> apiClient.get(`/department/${id}`)

export const saveDepartment = (department) => apiClient.post(`/department/`,department)

export const updateDepartment = (department) => apiClient.put(`/department/`,department)

export const getDepartmentByCompanyId = (comp_id)=> apiClient.get(`/department/getdeptbycompid/${comp_id}`)