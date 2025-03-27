import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import CompanyComponent from "./Company/CompanyComponent";
import ViewCompanyComponent from "./Company/ViewCompanyComponent";
import ViewDepartmentComponent from "./Department/ViewDepartmentComponent";
 
export default function AssetManagement() {
    return(
        <div className="AssetManagement">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/company/:id" element={ <CompanyComponent />}></Route> 
                    <Route path="/viewcompanies" element={ <ViewCompanyComponent />}></Route>
                    <Route path="/viewdepartments" element={ <ViewDepartmentComponent />}></Route>

                </Routes>
           </BrowserRouter>
        </div>
    )
}