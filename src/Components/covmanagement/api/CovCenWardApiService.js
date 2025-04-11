import {apiClient} from "./ApiClient";

export const saveCovCenWard = (ward) => apiClient.post(`/covcenward/`,ward)
export const getCovCenWardById = (id) => apiClient.get(`/covcenward/${id}`)
export const getAllCovCenWards = () => apiClient.get(`/covcenward/`)
export const updateCovCenWard = (ward) => apiClient.put(`/covcenward/`,ward)

