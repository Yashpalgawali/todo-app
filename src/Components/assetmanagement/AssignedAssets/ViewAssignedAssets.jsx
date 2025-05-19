import { useEffect, useRef, useState } from "react"
import { viewAllAssignedAssets } from "../api/EmployeeApiService"
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import $ from  'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality
import { useAuth } from "../Security/AuthContext";
import { exportAssignAssets } from "../api/AssetAssignHistory";


export default function ViewAssignedAssets () {
    const [assetlist,setAssetList] = useState([])
    const tableRef = useRef(null); // Ref for the table

    useEffect(
        () => retrieveAllAssignedAssets ,[]
    )

    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && assetlist.length > 0 ) {
          $(tableRef.current).DataTable(); // Initialize DataTables
        }
      }, [assetlist]); // Re-initialize DataTables when activities data changes
   

    function  retrieveAllAssignedAssets() {       
        viewAllAssignedAssets().then((response) => {
            setAssetList(response.data)
        })        
    }

    function exportAssignedAssets() { 
            exportAssignAssets().then((response)=>{
              // Convert the array buffer to a Blob
              const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

              // Create a link element to trigger download
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'Assets Assign List.xlsx';
              link.click();
        })
    }

    return(
        <div className="container">
            <h1>View Assigned Assets <button type="submit" className="btn btn-primary m-3" onClick={exportAssignedAssets} > <FileDownloadIcon /> Export Assigned Assets</button> </h1>

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
                            (asset,index ) => (
                                <tr key={asset.assigned_asset_id} >
                                    <td>{index+1}</td>
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