import { apiClient } from "./ApiClient";

export const getAllAssetTypes = () => apiClient.get('/assettype/')

export const getAssetTypeById = (id) => apiClient.get(`/assettype/${id}`)

export const saveAssetType = (assettype) => apiClient.post(`/assettype/`,assettype)

export const updateAssetType = (assettype) => apiClient.put(`/assettype/`,assettype)