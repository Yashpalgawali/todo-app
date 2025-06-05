import { useEffect, useRef, useState } from "react"
import { viewAllAssignedAssets } from "../api/EmployeeApiService"
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import DataTable from 'datatables.net-react'; // DataTables React integration
import DT from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

import { exportAssignAssets } from "../api/AssetAssignHistory";
import { Button, Tooltip } from '@mui/material';

DataTable.use(DT);

export default function ViewAssignedAssets () {
    const [assetlist,setAssetList] = useState([])
    const tableRef = useRef(null); // Ref for the table
    const [successMessage,setSuccessMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState('')

    useEffect(
        () => {
                retrieveAllAssignedAssets() 
                if(sessionStorage.getItem('response')!='' && sessionStorage.getItem('response')!=null) {
                     
                    setSuccessMessage(sessionStorage.getItem('response'))
                    setErrorMessage('')
                    setTimeout(() => {
                        sessionStorage.removeItem('response')
                        setSuccessMessage('')
                    }, 3000);
                }

                if(sessionStorage.getItem('reserr')!='' && sessionStorage.getItem('reserr')!=null) {
                    
                    setErrorMessage(sessionStorage.getItem('reserr'))
                    setSuccessMessage('')
                    setTimeout(() => {
                        sessionStorage.removeItem('reserr')
                        setErrorMessage('')
                    }, 3000);
                }
                
            },[]
    )

    function retrieveAllAssignedAssets() {       
        viewAllAssignedAssets().then((response) => {
            setAssetList(response.data)
        })
    }

    function exportAssignedAssets() { 
            exportAssignAssets().then((response)=> {
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
            <h2>View Assigned Assets 
                <Button variant='contained' style={ { float : 'right' } } color='primary' onClick={exportAssignedAssets}><Tooltip title="Download Assigned Assets" arrow placement="bottom" enterDelay={10} leaveDelay={300}><FileDownloadIcon /> Export </Tooltip> </Button>
            </h2>
            <>
            {successMessage && <div className="alert alert-success">{successMessage}</div> }
            {errorMessage && <div className="alert alert-warning">{errorMessage}</div> }
            </>
             <DataTable 
                data={assetlist}
                columns={[
                    // { title: 'Sr', data: 'assigned_asset_id' },
                    { title: 'Sr', data: null , render: function(data,type,row,meta){ return meta.row+1} },
                    { title: 'Employee', data: 'employee.emp_name' },
                    { title: 'Assigned Assets', data: 'assigned' },
                    { title: 'Asset types', data: 'assigned_types' },                    
                    { title: 'Designation', data: 'employee.designation.desig_name' },
                    { title: 'Department', data: 'employee.department.dept_name' },
                    { title: 'Company', data: 'employee.department.company.comp_name' }
                ]}
                options={{
                    searching: true,
                    paging: true,
                    ordering: true,
                    info: true,
                    responsive: true
                }}
           />
            {/* <table className="table table-hover table-striped" ref={tableRef}>
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
                <tbody> */}
                    {/* {
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
                    }                     */}
                {/* </tbody>
            </table> */}
        </div>
    )
}