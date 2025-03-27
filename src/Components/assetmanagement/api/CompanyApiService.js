import { apiClient } from "./ApiClient";

  export const retrieveAllCompanies = () => apiClient.get('/company/')
  export const createCompany = (company) => apiClient.post('/company/',company)
  export const retrieveCompanyById = (id) => apiClient.get(`/company/${id}`)
  export const updateCompany = (company) => apiClient.put('/company/',company)