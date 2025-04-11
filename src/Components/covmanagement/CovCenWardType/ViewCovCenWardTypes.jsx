import { useEffect, useRef } from "react"
import { useState } from "react"
import { getAllCovCenWardTypes } from "../api/CovCenWardTypeApiService"
import { useNavigate } from "react-router-dom";
 
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality
import $ from 'jquery'; // jQuery is required for DataTables to work

export  default function ViewCovCenWardTypes() {

    const [covcenwardtypelist, setCovcenWardtypeList] = useState([])

    const tableRef = useRef(null)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(
        () => retrieveAllCovCenWardTypes() ,[]
    )

    useEffect(
        () => {
            if(tableRef.current && covcenwardtypelist.length>0) {
                $(tableRef.current).DataTable()
            }
        },[covcenwardtypelist]
    )
    
    function  retrieveAllCovCenWardTypes() {
        getAllCovCenWardTypes().then((response) => {
            setCovcenWardtypeList(response.data)
        })
    }

    const navigate = useNavigate()

    function updateWardTypebyId(id) {
        navigate(`/covcenwardtype/${id}`)
    }
    function addNewWardtype(){
        navigate(`/covcenwardtype/-1`)
    }


    return(
        <div className="container">
            <h1 className="text-center">View Ward Types <button type="submit" className="btn btn-primary" onClick={addNewWardtype}>Add Ward Type</button> </h1>
            { successMessage && <div className="alert alert-success">{ successMessage }</div> }
            { errorMessage && <div className="alert alert-warning">{ errorMessage }</div> }
           
            <table className="table table-striped table-hover" ref={tableRef}>
                <thead> 
                    <tr>
                        <th>Sr</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            covcenwardtypelist.map(
                                (type) => (
                                    <tr key={type.covcenwardtype_id}>
                                        <td>{type.covcenwardtype_id}</td>
                                        <td>{type.covcenward_type}</td>
                                        <td><button type="submit" className="btn btn-success m-3" onClick={()=>updateWardTypebyId(type.covcenwardtype_id)} >Update</button></td>
                                    </tr>
                                )
                            )
                        }
                        
                    </tbody>
              
            </table>
        </div>
    )
}
