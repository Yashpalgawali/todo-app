import { apiClient } from "./ApiClient";

export const getAllDepartments = ()=> apiClient.get('/department/')