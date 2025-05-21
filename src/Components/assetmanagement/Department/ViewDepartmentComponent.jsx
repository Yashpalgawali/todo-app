import { useEffect, useRef, useState } from "react"
import { getAllDepartments } from "../api/DepartmentApiService"
import { useNavigate } from "react-router-dom"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import $ from 'jquery'; // jQuery is required for DataTables to work
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

export default function ViewDepartmentComponent() {

    const [deptlist, setDeptList] = useState([])
    const [successMessage,setSuccessMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const tableRef = useRef(null); // Ref for the table

    const navigate = useNavigate()
    
    useEffect(
        () =>  {
            retrieveAllDepartments()
            if(sessionStorage.getItem('response')!= null) {
                setSuccessMessage(sessionStorage.getItem('response'))
                setErrorMessage('')
                setTimeout(() => {
                    setSuccessMessage('')
                    sessionStorage.removeItem('response')
                }, 2000);
            }
    
            if(sessionStorage.getItem('reserr')!= null) {
                setErrorMessage(sessionStorage.getItem('reserr'))
                setSuccessMessage('')
                setTimeout(() => {
                    setErrorMessage('')
                    sessionStorage.removeItem('reserr')
                }, 2000);
            }
        } , []
    )

    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && deptlist.length >0 ) {
          $(tableRef.current).DataTable(); // Initialize DataTables
        }
      }, [deptlist]); // Re-initialize DataTables when activities data changes
    
    function retrieveAllDepartments() {
        getAllDepartments().then((response) => setDeptList(response.data)).catch((error) => console.log(error))
    }

    function updateDepartmentById(id) {
         navigate(`/department/${id}`)
    }

    function addNewDepartment(){
        navigate(`/department/-1`)
    }

    return(
        <div className="container">
            <h2>View Departments <button type="submit" className="btn btn-primary" onClick={addNewDepartment}>Add Department</button></h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>  }
            {errorMessage && <div className="alert alert-warning">{errorMessage}</div>  }
            <table className="table table-striped table-hover" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Department</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deptlist.length == 0 ? (
                            <tr>
                                <td colSpan="4">No Data Available</td>
                            </tr>
                        ): (
                        deptlist.map(
                            (dept,index)=> (
                                <tr key={dept.dept_id}>
                                    <td>{index+1}</td>
                                    <td>{dept.dept_name}</td>
                                    <td>{dept.company?.comp_name}</td>
                                    <td><button type="submit" className="btn btn-success" onClick={()=>updateDepartmentById(dept.dept_id)}><EditSquareIcon /> UPDATE</button> </td>
                                </tr>
                            )
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}