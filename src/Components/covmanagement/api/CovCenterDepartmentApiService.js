import { apiClient } from "./ApiClient";


export const saveCovCenDepartment = (department) => apiClient.post(`covcendept/`,department)

export const getAllCovCenDepartments = () => apiClient.get(`covcendept/`)

export const getCovCenDepartmentById = (id) => apiClient.get(`covcendept/${id}`)

export const updateCovCenDepartment = (department) => apiClient.put(`covcendept/`,department)
