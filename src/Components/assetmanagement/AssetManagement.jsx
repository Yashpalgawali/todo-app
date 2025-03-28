import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import CompanyComponent from "./Company/CompanyComponent";
import ViewCompanyComponent from "./Company/ViewCompanyComponent";
import ViewDepartmentComponent from "./Department/ViewDepartmentComponent";
import DepartmentComponent from "./Department/DepartmentComponent";
import AssetTypeComponent from "./AssetType/AssetTypeComponent";
import ViewAssettypeComponent from "./AssetType/ViewAssettypeComopnent";
 
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
                </Routes>
           </BrowserRouter>
        </div>
    )
}