import { Link } from "react-router-dom";

export default function HeaderComponent() {
    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg"> 
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">page</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                             <li className="nav-item fs-5"><Link className="nav-link" to="/viewcompanies">Company</Link></li>
                             
                             <li className="nav-item fs-5"><Link className="nav-link" to="/viewdepartments">Department</Link></li>
                             <li className="nav-item fs-5"><Link className="nav-link" to="/viewdesignations">Designation</Link></li>
                             <li className="nav-item fs-5"><Link className="nav-link" to="/viewassettypes">Asset type</Link></li>
                             <li className="nav-item fs-5"><Link className="nav-link" to="/viewassets">Assets</Link></li>
                             <li className="nav-item fs-5"><Link className="nav-link" to="/activities">Activities</Link></li>
                             <li className="nav-item fs-5"><Link className="nav-link" to="/viewemployees">Employees</Link></li>
                             <li className="nav-item fs-5"><Link className="nav-link" to="/viewassignedassets">Assigned Assets</Link></li>
                             
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                         <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li> 
                        <li className="nav-item fs-5"><Link className="nav-link" to="/logout"  >Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    )
}