import { BrowserRouter, Route, Routes } from "react-router-dom";
 import ViewCovCenters from "./CovCenter/ViewCovCenters";
import AddCovCenter from "./CovCenter/AddCovCenter";
import ViewCovCenDepartment from "./CovCenDepartment/ViewCovCenDepartment";
import AddCovCenDepartment from "./CovCenDepartment/AddCovCenDepartment";
import CovCenWardType from "./CovCenWardType/CovCenWardType";
import HeaderComponent from "./HeaderComponent";
import ViewCovCenWardTypes from "./CovCenWardType/ViewCovCenWardTypes";
import CovCenWardComponent from "./CovCenWard/CovCenWardComponent";
import ViewCovCenWard from "./CovCenWard/ViewCovCenWard";

export default function CovManagement() {
    return(
        <div>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/covcenters" element={ <ViewCovCenters /> }></Route>
                    <Route path="/covcenter/:id" element= { <AddCovCenter /> }></Route>
                    <Route path="/covcendepts" element={ <ViewCovCenDepartment /> }></Route>
                    <Route path="/covcendept/:id" element={ <AddCovCenDepartment /> }></Route>
                    <Route path="/covcenwardtype/:id" element={ <CovCenWardType /> }></Route>
                    <Route path="/covcenwardtypes" element= { <ViewCovCenWardTypes />}></Route>
                    <Route path="/covcenward/:id" element={ <CovCenWardComponent /> }></Route>
                    <Route path="/covcenwards" element= { <ViewCovCenWard />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}