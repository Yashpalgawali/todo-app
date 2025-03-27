import { useEffect, useState } from "react"
import { retrieveAllCompanies } from "../api/CompanyApiService"
import { useNavigate } from "react-router-dom"

export default function ViewCompanyComponent() {

    const [complist,setCompList] = useState([])
    const [successMessage , setSuccessMessage] = useState('')
    const navigate = useNavigate()

    useEffect(()=> refreshCompanies() , [] )

    function refreshCompanies() {
        if(sessionStorage.getItem('response')!=''){
            setSuccessMessage(sessionStorage.getItem('response'))
             setTimeout(() => {
                sessionStorage.removeItem('response')
                setSuccessMessage('')
             }, 2000);
        }
        retrieveAllCompanies().then((response)=> setCompList(response.data) )

    }

    function addNewCompany() {
        navigate(`/company/-1`)
    }

    function updateCompany(id) {
        navigate(`/company/${id}`)
    }

    return(
        <div className="container">
            <h2 className="text-center m-4">View Company <button type="submit" style={ { float: 'right !important' } } className="btn btn-primary" onClick={addNewCompany} ><strong>Add Company</strong></button> </h2>
            {successMessage && <div className="text-center alert alert-success">  {successMessage}  </div> }
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Company Name</th>
                        <th>UPDATE</th>
                    </tr>
                </thead>
                <tbody>
                     {
                        
                        complist.map(
                            comp => (
                                <tr key={comp.comp_id}>
                                    <td>{comp.comp_id}</td>
                                    <td>{comp.comp_name}</td>
                                    <td> <button type="submit" className="btn btn-success" onClick= {()=>updateCompany(comp.comp_id)}>UPDATE</button> </td>
                                </tr>
                            )
                        )
                     }
                </tbody>
            </table>
        </div>
    )
}