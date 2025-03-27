import { useEffect, useState } from "react"
import { getAllDepartments } from "../api/DepartmentApiService"

export default function ViewDepartmentComponent() {

    const [deptlist, setDeptList] = useState([])

    useEffect(
        () => retrieveAllDepartments() , []
    )

    function retrieveAllDepartments() {
        getAllDepartments().then((response) => console.log(response)).catch((error) => console.log(error))
    }

    return(
        <div className="container">
            <h2>View Departments</h2>
            <table className="table table-striped table-hover">
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
                        deptlist.map(
                            dept=> (
                                <tr key={dept.dept_id}>
                                    <td>{dept.dept_id}</td>
                                    <td>{dept.dept_name}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        )
                    
}
                </tbody>
            </table>
        </div>
    )
}