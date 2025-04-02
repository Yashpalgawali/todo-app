import { useEffect, useState } from "react"
import { getAllAssets, getAllEmployees } from "../api/EmployeeApiService"
import ViewAssignedAssetHistory from "../AssignedAssets/ViewAssignedAssetHistory"
import { useNavigate } from "react-router-dom"

export default function ViewEmployeeComponent() {

    const [emplist , setEmpList]  = useState([])
    const navigate = useNavigate()


    useEffect(
        () => retrieveAllEmployees() , []
    )
function retrieveAllEmployees() {
        getAllEmployees().then((response)=>
        {
             setEmpList(response.data)
        })
}

function getEmployeeAssetAssignHistory(id) {
     navigate(`/viewassetassignhistory/${id}`)
}

function addNewEmployee()
{
    navigate(`/employee/-1`)
}
    return(
        <div className="container">
            <h1>View Employees <button type="submit" className="btn btn-success m-3" onClick={addNewEmployee}>Add Employee</button></h1>

            <table className="table table-striped table-hover">
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
                            (emp) => (
                                <tr key={emp.emp_id}>
                                    <td>{emp.emp_id}</td>
                                    <td>{emp.emp_name}</td>
                                    <td>{emp.department.company.comp_name}</td>
                                    <td>{emp.department.dept_name}</td>
                                    <td>
                                        <button type="submit" className="btn btn-primary" onClick={()=>getEmployeeAssetAssignHistory(emp.emp_id)}>History</button>
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