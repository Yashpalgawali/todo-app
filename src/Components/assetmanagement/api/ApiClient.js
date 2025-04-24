import axios from "axios";
import { useState } from "react";

 

export const apiClient = axios.create({ baseURL : 'http://localhost:8989/assetmanagementrest' , withCredentials: true,  })
 

//  apiClient.interceptors.request.use((config) => {
//         const token = localStorage.getItem('token')    
//             alert('intercepted')
//           config.headers.Authorization = token;
//           return config;
//         });

