import { apiClient } from "./ApiClient";


export const getAllCovCenWardTypes = () => apiClient.get('/covcenwardtype/')

export const getCovCenWardTypeById = (id) => apiClient.get(`/covcenwardtype/${id}`)

export const saveCovCenWardType = (type) => apiClient.post('/covcenwardtype/',type)

export const updateCovCenWardType = (type) => apiClient.put('/covcenwardtype/',type)