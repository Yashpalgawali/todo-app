import { useEffect, useRef, useState } from "react"
import { getAllDesignations } from "../api/DesignationApiService"
import { useNavigate } from "react-router-dom"
import EditSquareIcon from '@mui/icons-material/EditSquare';

import $ from 'jquery'; // jQuery is required for DataTables to work

import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

export default function ViewDesignation() {

    const [desiglist,setDesigList] = useState([])
    const navigate = useNavigate()
    const [successMessage , setSuccessMessage] = useState('')
    const [errorMessage , setErrorMessage] = useState('')
    const tableRef = useRef(null)

    useEffect(
            () => 
                { 
                    if(sessionStorage.getItem('response')!='') {
                        setSuccessMessage(sessionStorage.getItem('response'))
                         setTimeout(() => {
                            sessionStorage.removeItem('response')
                            setSuccessMessage('')
                         }, 2000);
                    }
                    if(sessionStorage.getItem('reserr')!=''){
                        setErrorMessage(sessionStorage.getItem('reserr'))
                         setTimeout(() => {
                            sessionStorage.removeItem('reserr')
                            setErrorMessage('')
                         }, 2000);
                    }             
                                       
                    retrieveAllDesignations()
                },[]) 

    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && desiglist.length >0 ) {
            $(tableRef.current).DataTable(); // Initialize DataTables
        }
        }, [desiglist]); // Re-initialize DataTables when activities data changes
    

    function retrieveAllDesignations() {
        getAllDesignations().then((response) => {  setDesigList(response.data) })
    }

    function updateDesignation(id) {
        navigate(`/designation/${id}`)
    }
    
    function addNewDesignation() {
        navigate(`/designation/-1`)
    }
    
    return(
        <div className="container">
            <h1>View Designations <button type="submit" className="btn btn-primary" onClick={addNewDesignation}>Add Designation</button> </h1>
            { successMessage && <div className="alert alert-success">{successMessage}</div> }
            { errorMessage && <div className="alert alert-warning">{ errorMessage}</div> }
            <table className="table table-striped table-hover" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    desiglist.map(
                        (desig,index) => (
                            <tr key={desig.desig_id}>
                                <td>{index+1}</td>
                                <td>{desig.desig_name}</td>
                                <td><button type="submit" className="btn btn-success" onClick={()=>updateDesignation(desig.desig_id)}><EditSquareIcon /> UPDATE</button> </td>
                            </tr>
                        )
                      )
                    }
                </tbody>
            </table>
        </div>
    )
}