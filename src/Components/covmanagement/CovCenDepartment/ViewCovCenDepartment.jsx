import { useEffect, useRef, useState } from "react"
import { getAllCovCenDepartments } from "../api/CovCenterDepartmentApiService"
import { useNavigate } from "react-router-dom"
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

import $ from 'jquery'; // jQuery is required for DataTables to work

import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

export default function ViewCovCenDepartment(){

    const [covcendeptlist ,setCovcenDeptList] = useState([])
    const [successMessage,setSuccessMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState('')

    const navigate = useNavigate()
    const tableRef = useRef(null)
    useEffect(
        () => retrieveAllDepartments, []
    )

    useEffect(
        () => {
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

            if(tableRef.current && covcendeptlist.length >0){
                $(tableRef.current).DataTable()
            }
        }, [covcendeptlist]
    )

    function retrieveAllDepartments() {
        getAllCovCenDepartments().then((response) => {
            setCovcenDeptList(response.data)
        })
    }

    function updateCovCenDepartment(id) {
        navigate(`/covcendept/${id}`)
    }

    function addNewDepartment()
    {
        navigate(`/covcendept/-1`)
    }

    return(
        <div className="container">
            <h1 className="text-center">View CovCen Departments <button type="submit" className="btn btn-success" onClick={addNewDepartment} ><AddBoxIcon /> Add Department</button></h1>
            { successMessage && <div className="alert alert-success">{successMessage}</div> }
            { errorMessage && <div className="alert alert-warning">{errorMessage}</div> }
            <table className="table table-striped table-hover" ref={tableRef}>
                <thead>
                    <tr>
                    <th>Sr</th>
                    <th>Department</th>
                    <th>Center</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody> 
                    {
                        covcendeptlist.map(
                            (dept) => (
                                <tr key={dept.covcendept_id}>
                                    <td>{dept.covcendept_id}</td>
                                    <td>{dept.covcendept_name}</td>                                   
                                    <td>{dept.covcen_name}</td>
                                    <td>
                                        <button type="submit" className="btn btn-success" 
                                                onClick={()=>updateCovCenDepartment(dept.covcendept_id)} > 
                                                <EditCalendarIcon /> Update
                                        </button>
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