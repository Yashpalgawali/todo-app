
import { apiClient } from "./ApiClient";


export const getAllEmployees = ()=> apiClient.get('/employee/')

export const viewAllAssignedAssets = ()=>apiClient.get('/employee/viewassignedassets')

export const viewAssetAssignHistoryByEmployeeId = (id)=> apiClient.get(`/employee/viewemphistbyempid/${id}`)