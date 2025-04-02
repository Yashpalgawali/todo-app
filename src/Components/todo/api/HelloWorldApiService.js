
import { apiClient } from "./ApiClient"


// // Way 1 
// export function retrieveHelloWorldBean() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

// Way 2
// export const retrieveHelloWorldBean = () => axios.get('http://localhost:8080/hello-world-bean')

// export const retrieveHelloWorldBeanPathVariable = (username) => axios.get(`http://localhost:8080/hello-world/path-variable/${username}`)

// By using common client config


export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean')

export const retrieveHelloWorldBeanPathVariable 
            = (username,token) => apiClient.get(`/hello-world/path-variable/${username}`,
                // { 
                //     headers : {
                //         Authorization : token
                //     }
                // }
            )



