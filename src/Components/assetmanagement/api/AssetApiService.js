import { apiClient } from "./ApiClient";

export const getAllAssets= ()=> apiClient.get('/asset/')

export const getAssetById = (id) => apiClient.get(`/asset/${id}`)

export const saveAsset = (asset) => apiClient.post(`/asset/`,asset)

export const updateAsset = (asset) => apiClient.put(`/asset/`,asset)


