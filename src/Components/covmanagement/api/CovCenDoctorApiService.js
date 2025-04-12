import { apiClient } from "./ApiClient";


export const saveCovCenDoctor = (doctor) => apiClient.get(`covcendoc/`,doctor)

export const getAllCovCenDoctors = () => apiClient.get(`covcendoc/`)

export const getCovCenDoctorById = (id) => apiClient.get(`covcendoc/${id}`)

export const updateCovCenDoctor = (doctor) => apiClient.put(`covcendoc/`,doctor)
