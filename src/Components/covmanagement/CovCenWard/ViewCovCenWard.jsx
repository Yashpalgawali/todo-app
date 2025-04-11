import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCovCenWards } from "../api/CovCenWardApiService"
import $ from 'jquery'; // jQuery is required for DataTables to work

import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

export default function ViewCovCenWard() {

    const [covcenwardlist,setCovCenwardList] = useState([])

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    const tableRef = useRef(null); // Ref for the table
     

    useEffect(
        () => {
            if(tableRef.current && covcenwardlist.length>0) {
                $(tableRef.current).DataTable()
            }
        },[covcenwardlist]
    )

    useEffect(() => retrieveAllCovCenWards , [])

    function retrieveAllCovCenWards() {
        getAllCovCenWards().then((response)=>{
            setCovCenwardList(response.data)
        })
    }

    function addNewCovCenWard() {
        navigate(`/covcenward/-1`)
    }
    
    function updateCovCenWard(id) {
        navigate(`/covcenward/${id}`)
    }

    return(
        <div className="container">
            <h1 className="text-center">View CovCenWards <button type="submit" className="btn btn-success" onClick={addNewCovCenWard}>Add Ward</button></h1>
            { successMessage && <div className="alert alert-success">{ successMessage }</div> }
            { errorMessage && <div className="alert alert-warning">{ errorMessage }</div> }
            <table className="table table-hover table-striped" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Type</th>
                        <th>Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        covcenwardlist.map(
                            (ward) => (
                                <tr key={ward.covcenward_id}>
                                   
                                    <td>{ward.covcenward_id}</td>
                                    <td>{ward.covcenward_wardtype.covcenward_type}</td>
                                    <td>{ward.covcenward_num}</td>
                                    <td><button type="submit" className="btn btn-success" onClick={()=>updateCovCenWard(ward.covcenward_id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}