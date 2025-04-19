import { apiClient } from "./ApiClient";


export const executeJwtAuthentication = (username,password) => apiClient.post(`/authenticate`,
    { username,password }
) 