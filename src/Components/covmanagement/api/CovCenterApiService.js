import { apiClient } from "./ApiClient";


export const saveCovCenter = (center) => apiClient.get(`covcen/`,center)

export const getAllCovCenters = () => apiClient.get(`covcen/`)

export const getCovCenterById = (id) => apiClient.get(`covcen/${id}`)

export const updateCovCenter = (center) => apiClient.put(`covcen/`,center)
