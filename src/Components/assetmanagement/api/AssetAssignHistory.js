import { apiClient } from "./ApiClient";

export const exportAssignAssets = 
            () => apiClient.get(`/employee/exportassignedassets/excel`,{
                                        responseType: 'arraybuffer'
                                    })

export const exportAssignAssetsByEmpId = 
                        (empid) => apiClient.get(`/employee/exportassignshistory/excel/${empid}`,{
                            responseType: 'arraybuffer'
                        })