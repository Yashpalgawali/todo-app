import { useEffect, useRef } from "react"
import { useState } from "react"
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { useNavigate } from "react-router-dom";
 
import $ from 'jquery'; // jQuery is required for DataTables to work

import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality
import { getAllCovCenDoctors, updateCovCenDoctor } from "../api/CovCenDoctorApiService";

export default function ViewCovCenDoctorComponent() {
    
    const [covcendoclist,setCovCenDocList] = useState([])

    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const tableRef = useRef(null); // Ref for the table

    useEffect(
        () => {
            if(tableRef.current && covcendoclist.length>0) {
                $(tableRef.current).DataTable()
            }
        },[covcendoclist]
    )     
    useEffect(
        () => {
            retrieveAllCovcenDoctors()
        }, []
    )

    function retrieveAllCovcenDoctors() {
        getAllCovCenDoctors().then((response)=>{
            console.log(response.data)
            setCovCenDocList(response.data)
        })
    }

    function addDoctor()
    {
        navigate(`/covcendoc/-1`)
    }

    function updateCovCenDoctor(id) {
        navigate(`/covcendoc/${id}`)
    }

    return(
        <div className="container">
            <h1 className="text-center">View Docts <button type="submit" className="btn btn-success" onClick={addDoctor}>Add Doc</button> </h1>
        <table className="table table-striped table hover">
            <thead>
                <tr>
                    <th>Sr </th>
                    <th>Doc </th>
                    <th>Department </th>
                    <th>Actions </th>
                </tr>
            </thead>
            <tbody>
                {
                    covcendoclist.map(
                        (doc) => (
                            <tr key={doc.covcendoc_id}>
                                <td>{doc.covcendoc_id}</td>
                                <td>{doc.covcendoc_name}</td>
                                <td>{doc.covcen_doc_dept?.covcendept_name}</td>
                                <td>
                                    <button type="submit" className="btn btn-success m-3" onClick={()=>updateCovCenDoctor(doc.covcendoc_id)}><EditCalendarIcon /> Update</button>
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