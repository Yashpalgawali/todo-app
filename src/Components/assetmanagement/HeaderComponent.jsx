import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext"; 
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';


export default function HeaderComponent() {

    // const authContext = useContext(AuthContext)

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    const navigate = useNavigate()

    async function logout() {        
       const res = await authContext.logout()
       if(res) {
            navigate(window.location.href)
       }
       else {
            alert('logout failed')
       }
    }
    return(
        <header className="border-bottom border-light border-5 mb-5 p-2 ">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg"> 
                    {/* <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">page</a> */}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                        <li className="nav-item fs-5">{isAuthenticated &&  <Link className="nav-link" to="/viewcompanies">Company</Link>}</li>
                             
                             <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/viewdepartments">Department</Link>} </li>
                             <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/viewdesignations">Designation</Link> }</li>
                             <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/viewassettypes">Asset Type</Link>} </li>
                             <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/viewassets">Assets</Link>} </li>
                             
                             <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/viewemployees">Employees</Link>} </li>
                             <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/viewassignedassets">Assigned Assets</Link>} </li>
                             <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/activities">Activities</Link>} </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                         <li className="nav-item fs-5">{!isAuthenticated && <Link className="nav-link" to="/login"><LoginIcon /> Login</Link> }</li> 
                        <li  className="nav-item fs-5">{isAuthenticated &&<Link className="nav-link"  onClick={logout} ><LogoutIcon  /> Logout</Link>}</li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    )
}