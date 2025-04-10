import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "../assetmanagement/HeaderComponent";
import ViewCovCenters from "./CovCenter/ViewCovCenters";
import AddCovCenter from "./CovCenter/AddCovCenter";

export default function CovManagement() {
    return(
        <div>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/covcenters" element={ <ViewCovCenters /> }></Route>
                    <Route path="/covcenter/:id" element= { <AddCovCenter /> }></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}