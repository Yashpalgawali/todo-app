import axios from "axios";
import { useNavigate } from "react-router-dom";


export const apiClient = axios.create({ 
                            baseURL : 'http://localhost:8989/assetmanagementrest' , withCredentials: true
                        }) 

  // ✅ Response Interceptor (to get status)
  apiClient.interceptors.response.use(
    (response) => {
       
      // Access response.status here
     
      console.log('Response Status:', response.status);
      return response;
    },
    (error) => {
      if (error.response) {
        console.error('Response Error Status:', error.response.status);
        if (error.response.status === 401) {
            //const path = require('path');
            sessionStorage.setItem('reserr','You are not Authorized. Please Login to Continue!!')
            window.location.href = window.location.href;
           
          }
      } else {
        console.error('Network/Error:', error.message);
      }
      return Promise.reject(error);
    }
  );                        

//  apiClient.interceptors.request.use((config) => {
//         const token = localStorage.getItem('token')    
//           alert('intercepted')
//           console.log(config)
//           config.headers.Authorization = token;
//           return config;
//         });

