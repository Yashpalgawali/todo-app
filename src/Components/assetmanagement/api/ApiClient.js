import axios from "axios";
import { toast } from "react-toastify";

export const apiClient = axios.create({ 
                            baseURL : 'http://localhost:8989/assetmanagementrest' , withCredentials: true
                        }) 


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle HTTP errors (e.g., 401 Unauthorized)
      if (error.response.status === 401) {
        toast.error('Unauthorized. Redirecting to login...', {
          onClose: () => {
            sessionStorage.setItem('reserr', 'You are not Authorized. Please Login to Continue!!');
            window.location.href = '/login';
          },
        });
      }
    } else {
      // Handle network/server disconnect error
      console.error('Network error:', error.message);

      toast.error('Server not reachable. Redirecting...', {
        onClose: () => {
          sessionStorage.setItem('reserr', 'Backend is unreachable. Please try again later.');
          window.location.href = '/login';
        },
      });
    }

    return Promise.reject(error);
  }
);

  // // ✅ Response Interceptor (to get status)
  // apiClient.interceptors.response.use(
  //   (response) => {
       
  //     // Access response.status here     
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response) {
  //      alert(JSON.stringify(error))
  //       if (error.response.status === 401) {
            
  //         toast.error('Unauthorized. Redirecting to login...', {
  //           onClose: () => {
  //             sessionStorage.setItem('reserr', 'You are not Authorized. Please Login to Continue!!');
  //             window.location.href = '/login';
  //           }
  //         });
  //           // sessionStorage.setItem('reserr','You are not Authorized. Please Login to Continue!!')
  //           // window.location.href = window.location.href;
  //           // window.location.reload()

  //         }
           
  //     } else {
  //       console.error('Network/Error:', error.message);
  //     }
  //     return Promise.reject(error);
  //   }
  // );                        

 
