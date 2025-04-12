import { BrowserRouter } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";

export default function LeadGenerationComponent(){
    return(
        <div className="container">
            
            <BrowserRouter>
                <HeaderComponent />
            </BrowserRouter>
        </div>
    )
}