import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import CompanyComponent from "./Company/CompanyComponent";
import ViewCompanyComponent from "./Company/ViewCompanyComponent";
import ViewDepartmentComponent from "./Department/ViewDepartmentComponent";
import DepartmentComponent from "./Department/DepartmentComponent";
import AssetTypeComponent from "./AssetType/AssetTypeComponent";
import ViewAssettypeComponent from "./AssetType/ViewAssettypeComopnent";
import ViewAssetComponent from "./Assets/ViewAssetComponent";
import AssetComponent from "./Assets/AssetComponent";
import ActivityComponent from "./ActivityComponent";
import ViewEmployeeComponent from "./Employee/ViewEmployeeComponent";
import ViewDesignation from "./Designation/ViewDesignation";
import DesignationComponent from "./Designation/DesignationComponent";
import ViewAssignedAssets from "./AssignedAssets/ViewAssignedAssets";
import ViewAssignedAssetHistory from "./AssignedAssets/ViewAssignedAssetHistory";
import EmployeeComponent from "./Employee/EmployeeComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, { useAuth } from "./Security/AuthContext";
import RetriveAssets from "./Employee/RetriveAssets";
  
function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
       { return children }
    else {
        sessionStorage.setItem('reserr','You are not logged in. Please log in to continue!!')
        return <Navigate to="/" />
    }
}

export default function AssetManagement() {
    return(
        <div className="AssetManagement">
            <AuthProvider>
              <BrowserRouter basename={process.env.PUBLIC_URL}>
                <HeaderComponent />
                <Routes>
                    <Route path="/company/:id" element={ 
                       <AuthenticatedRoute>
                            <CompanyComponent />
                        </AuthenticatedRoute>
                      }>
                    </Route> 
                    <Route path="/viewcompanies" element={  <AuthenticatedRoute>  <ViewCompanyComponent />  </AuthenticatedRoute>}></Route>
                    <Route path="/viewdepartments" element={ 
                         <AuthenticatedRoute>
                            <ViewDepartmentComponent />
                        </AuthenticatedRoute>
                        } ></Route>
                    <Route path="/department/:id" element= {  <AuthenticatedRoute><DepartmentComponent />  </AuthenticatedRoute>}></Route>
                    <Route path="/assettype/:id" element= {  <AuthenticatedRoute><AssetTypeComponent />  </AuthenticatedRoute>}></Route>
                    <Route path="/viewassettypes" element= { <AuthenticatedRoute> < ViewAssettypeComponent/> </AuthenticatedRoute>} ></Route>
                    <Route path="/viewassets" element= { <AuthenticatedRoute> < ViewAssetComponent/>  </AuthenticatedRoute> } ></Route>
                    <Route path="/asset/:id" element= { <AuthenticatedRoute> < AssetComponent/>  </AuthenticatedRoute> }></Route>
                    <Route path="/activities" element= {  <AuthenticatedRoute>< ActivityComponent/>  </AuthenticatedRoute>}></Route>
                    <Route path="/viewdesignations" element= { <AuthenticatedRoute> < ViewDesignation />  </AuthenticatedRoute>}></Route>
                    <Route path="/designation/:id" element= { <AuthenticatedRoute> < DesignationComponent />  </AuthenticatedRoute> }></Route>
                    <Route path="/viewassignedassets" element= {  <AuthenticatedRoute>< ViewAssignedAssets />  </AuthenticatedRoute>}></Route>
                    <Route path="/viewassetassignhistory/:id" element= {  <AuthenticatedRoute>< ViewAssignedAssetHistory />  </AuthenticatedRoute>}></Route>
                    
                    <Route path='/' element={   <LoginComponent/>   }></Route>
                    <Route path='/login' element={   <LoginComponent />   }></Route>

                    <Route path="/employee/:id" element= { <AuthenticatedRoute>  < EmployeeComponent /> </AuthenticatedRoute>}></Route>
                    <Route path="/viewemployees" element= { <AuthenticatedRoute> < ViewEmployeeComponent />  </AuthenticatedRoute>}></Route>
                    <Route path='/retriveAssets/:id' element= { <AuthenticatedRoute> <RetriveAssets /> </AuthenticatedRoute> } ></Route>
                </Routes>
              </BrowserRouter>
           </AuthProvider>
        </div>
    )
}