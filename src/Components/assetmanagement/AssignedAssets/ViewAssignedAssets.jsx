import { useEffect, useRef, useState } from "react"
import { viewAllAssignedAssets } from "../api/EmployeeApiService"

import $ from  'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality
import { useAuth } from "../Security/AuthContext";


export default function ViewAssignedAssets () {
    const authContext = useAuth()

    const [assetlist,setAssetList] = useState([])
    const tableRef = useRef(null); // Ref for the table
    useEffect(
        () => retrieveAllAssignedAssets() , []
    )

    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && assetlist.length >0 ) {
          $(tableRef.current).DataTable(); // Initialize DataTables
        }
      }, [assetlist]); // Re-initialize DataTables when activities data changes
   

    function  retrieveAllAssignedAssets() {
        console.log('Logged in user is ',authContext.username)
        viewAllAssignedAssets().then((response) => {
            setAssetList(response.data)
        })        
    }
    return(
        <div className="container">
            <h1>View Assigned Assets <button type="submit" className="btn btn-primary m-3"> Export Assigned Assets</button> </h1>

            <table className="table table-hover table-striped" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Assigned Assets</th>
                        <th>Employee</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th>Company</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        assetlist.map(
                            (asset ) => (
                                <tr key={asset.assigned_asset_id} >
                                    <td>{ }</td>
                                    <td>{asset.assigned}</td>
                                    <td>{asset.employee.emp_name}</td>
                                    <td>{asset.employee.designation.desig_name}</td>
                                    <td>{asset.employee.department.dept_name}</td>
                                    <td>{asset.employee.department.company.comp_name}</td>
                                </tr>
                            )
                        )
                    }
                    
                </tbody>
            </table>
        </div>
    )
}