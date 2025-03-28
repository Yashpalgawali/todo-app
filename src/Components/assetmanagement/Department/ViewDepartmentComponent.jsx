import { useEffect, useState } from "react"
import { getAllDepartments } from "../api/DepartmentApiService"
import { useNavigate } from "react-router-dom"

export default function ViewDepartmentComponent() {

    const [deptlist, setDeptList] = useState([])

    const navigate = useNavigate()
    useEffect(
        () => retrieveAllDepartments() , []
    )

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
                                    <td>{dept.company.comp_name}</td>
                                    <td><button type="submit" className="btn btn-success" onClick={()=>updateDepartmentById(dept.dept_id)}>UPDATE</button> </td>
                                </tr>
                            )
                        )
                    
}
                </tbody>
            </table>
        </div>
    )
}