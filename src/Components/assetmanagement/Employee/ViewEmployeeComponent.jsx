import { useEffect, useRef, useState } from "react"
import {  getAllEmployees, getEmployeeById } from "../api/EmployeeApiService"
import { useNavigate } from "react-router-dom"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
 

import $ from 'jquery'; // jQuery is required for DataTables to work
 
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality
import { exportAssignAssetsByEmpId } from "../api/AssetAssignHistory";
import { Button } from "@mui/material";
// import { Button } from "@mui/material";
 
export default function ViewEmployeeComponent() {

    const [emplist , setEmpList]  = useState([])
   
    const navigate = useNavigate()
    const tableRef = useRef(null)

    useEffect(
        () => {
            if(tableRef.current && emplist.length>0) {
                $(tableRef.current).DataTable()
            }
        } ,[emplist]
    )
    useEffect(
        () => retrieveAllEmployees() , []
    )
function retrieveAllEmployees() {
        getAllEmployees().then((response)=>{
             setEmpList(response.data)
        })
}

function getEmployeeAssetAssignHistory(id) {
     navigate(`/viewassetassignhistory/${id}`)
}

function retrieveAllAssets(emp_id) {
        navigate(`/retriveAssets/${emp_id}`)
}

function addNewEmployee() {
    navigate(`/employee/-1`)
}

async function downloadHistory(empid)
{
    let emp_name = null
    await getEmployeeById(empid).then((response)=> {
       emp_name =response.data.emp_name
    })
    
    await exportAssignAssetsByEmpId(empid).then((response)=>{
          
          // Convert the array buffer to a Blob
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            console.log('blob = ',blob)
          // Create a link element to trigger download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'Asset Assign History('+emp_name+').xlsx';
          link.click();
    })
}

function editAssetAssigned(empid) {
    navigate(`/employee/${empid}`)
}

    return(
        <div className="container">
         <h2>View Employees
            <Button style={ { marginLeft : '10px' } } variant="contained" onClick={addNewEmployee} color="primary">Add Employee</Button>
         </h2>

            <table className="table table-striped table-hover" ref={tableRef}>
                <thead>
                    <tr> 
                        <th>Sr No.</th>
                        <th>Employee Name</th>
                        <th>Company</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        emplist.map(
                            (emp,index) => (
                                <tr key={emp.emp_id}>
                                    <td>{index+1}</td>
                                    <td>{emp.emp_name}</td>
                                    <td>{emp.department.company.comp_name}</td>
                                    <td>{emp.department.dept_name}</td>
                                    <td>
                                    <button type="submit" className="btn btn-primary" onClick={()=>getEmployeeAssetAssignHistory(emp.emp_id)}><VisibilityIcon /> History</button>
                                    <button type="submit" className="btn btn-primary m-2" onClick={()=>retrieveAllAssets(emp.emp_id)}><DeleteIcon /> Retrieve</button>
                                    <button type="submit" className="btn btn-primary m-2" onClick={()=>editAssetAssigned(emp.emp_id)}>Update</button>
                                    {/* <button type="submit" className="btn btn-primary m-2" onClick={()=>downloadHistory(emp.emp_id)}><FileDownloadIcon /> Download</button> */}
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