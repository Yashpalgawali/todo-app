import { apiClient } from "./ApiClient";

export const getAllActivities= ()=> apiClient.get('/activity/')