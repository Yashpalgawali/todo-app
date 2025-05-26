
import { apiClient } from "./ApiClient";

export const saveEmployee = (emp)=> apiClient.post('/employee/',emp)

export const getAllEmployees = ()=> apiClient.get('/employee/')

export const viewAllAssignedAssets = ()=>apiClient.get('/employee/viewassignedassets')

export const viewAssetAssignHistoryByEmployeeId = (id)=> apiClient.get(`/employee/viewemphistbyempid/${id}`)

export const getEmployeeById = (empid)=> apiClient.get(`/employee/${empid}`)

export const getAssignedAssetsByEmployeeId = (empid)=> apiClient.get(`/employee/getassignedassetsbyempid/${empid}`)