import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCovCenters } from "../api/CovCenterApiService"
import $ from 'jquery'; // jQuery is required for DataTables to work

import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

export default function ViewCovCenters() {
    
    const navigate = useNavigate()
    const [covcenlist ,setCovCenList] = useState([])
    const tableRef = useRef(null); // Ref for the table
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(
        () => {
            if(tableRef.current && covcenlist.length>0) {
                $(tableRef.current).DataTable()
            }
        },[covcenlist]
    )
    useEffect(
        () => {
                retrieveAllCovCenter()
                if(sessionStorage.getItem('response')!=''){
                    setSuccessMessage(sessionStorage.getItem('response'))
                    setTimeout(() => {
                        setSuccessMessage('')
                        sessionStorage.removeItem('response')
                    }, 2000);
                 }
                 if(sessionStorage.getItem('reserr')!=''){
                    setErrorMessage(sessionStorage.getItem('reserr'))
                    setTimeout(() => {
                        setErrorMessage('')
                        sessionStorage.removeItem('reserr')
                    }, 2000);
                 }    
            }, [] 
    )

    function retrieveAllCovCenter() {
        getAllCovCenters().then((response)=>{
            console.log(response)
                setCovCenList(response.data)
        })
    }

    function addNewCovCenter() {
        navigate(`/covcenter/-1`)
    }


    function updateCovCenter(id) {
       navigate(`/covcenter/${id}`)
    }

    function getAllCovCenterdepartments(id)
    {
        
    }
    return(
        <div className="container">
            <h1 className="text-center">View Cov Centers <button type="submit" className="btn btn-primary" onClick={addNewCovCenter}>Add CovCenter</button></h1>
            
            { successMessage && <div className="alert alert-success">{ successMessage }</div> }
            { errorMessage && <div className="alert alert-warning">{ errorMessage }</div> }
            <table className="table table-striped table-hover" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        covcenlist.map(
                            (covcen) => (
                                <tr key={covcen.covcenter_id}>
                                    <td>{covcen.covcenter_id}</td>
                                    <td>{covcen.covcenter_name}</td>
                                    <td>
                                    <button type="submit" className="btn btn-success" onClick={()=>updateCovCenter(covcen.covcenter_id)}>Update</button> &nbsp;
                                    <button type="submit" className="btn btn-primary" onClick={()=>getAllCovCenterdepartments(covcen.covcenter_id)}>Get All Departments</button> 
                                    </td>
                                </tr>
                            )
                        )
                    }
                    
                </tbody>

            </table>
        </div>
    )
}