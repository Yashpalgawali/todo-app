import { BrowserRouter, Route, Routes } from "react-router-dom";
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
 
export default function AssetManagement() {
    return(
        <div className="AssetManagement">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/company/:id" element={ <CompanyComponent />}></Route> 
                    <Route path="/viewcompanies" element={ <ViewCompanyComponent />}></Route>
                    <Route path="/viewdepartments" element={ <ViewDepartmentComponent />}></Route>
                    <Route path="/department/:id" element= { <DepartmentComponent />}></Route>
                    <Route path="/assettype/:id" element= { <AssetTypeComponent />}></Route>
                    <Route path="/viewassettypes" element= { < ViewAssettypeComponent/>}></Route>
                    <Route path="/viewassets" element= { < ViewAssetComponent/>}></Route>
                    <Route path="/asset/:id" element= { < AssetComponent/>}></Route>
                    <Route path="/activities" element= { < ActivityComponent/>}></Route>
                    <Route path="/viewdesignations" element= { < ViewDesignation />}></Route>
                    <Route path="/designation/:id" element= { < DesignationComponent />}></Route>
                    <Route path="/viewassignedassets" element= { < ViewAssignedAssets />}></Route>
                    <Route path="/viewassetassignhistory/:id" element= { < ViewAssignedAssetHistory />}></Route>
                   
                    <Route path="/employee/:id" element= { < EmployeeComponent />}></Route>
                    <Route path="/viewemployees" element= { < ViewEmployeeComponent />}></Route>
                   
                </Routes>
           </BrowserRouter>
        </div>
    )
}