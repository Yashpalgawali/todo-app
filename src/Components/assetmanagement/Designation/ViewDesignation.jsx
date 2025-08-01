import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDesignations }  from "../api/DesignationApiService"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import $ from 'jquery'; // jQuery is required for DataTables to work
 
import DataTable from 'datatables.net-react'; // DataTables React integration
import DT from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality
import { Button, Tooltip } from "@mui/material"



export default function ViewDesignation() {

    const [desiglist,setDesigList] = useState([])
    const navigate = useNavigate()
    const [successMessage , setSuccessMessage] = useState('')
    const [errorMessage , setErrorMessage] = useState('')
    const tableRef = useRef(null)

    useEffect(
    () => 
        { 
            if(sessionStorage.getItem('response')!='') {
                setSuccessMessage(sessionStorage.getItem('response'))
                        setTimeout(() => {
                        sessionStorage.removeItem('response')
                        setSuccessMessage('')
                    }, 2000);
            }
            if(sessionStorage.getItem('reserr')!=''){
                setErrorMessage(sessionStorage.getItem('reserr'))
                    setTimeout(() => {
                    sessionStorage.removeItem('reserr')
                    setErrorMessage('')
                    }, 2000);
            }             
                                
            retrieveAllDesignations()
        },[]) 

    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && desiglist.length >0 ) {
          $(tableRef.current).DataTable(); // Initialize DataTables
        }
      }, [desiglist]); // Re-initialize DataTables when activities data changes
   

    function retrieveAllDesignations() {
        getAllDesignations().then((response) => { setDesigList(response.data) })
    }

    function updateDesignation(id) {
        navigate(`/designation/${id}`)
    }
    
    function addNewDesignation() {
        navigate(`/designation/-1`)
    }
    
   return(
        <div className="container">
            <h2 className="text-center m-4">View Designation 
                <Button type="submit" variant="contained" color="primary" style={ { float: 'right  ' } } className="m-2" onClick={addNewDesignation} >Add Designation</Button>    
            </h2>
            {successMessage && <div className="text-center alert alert-success"><strong> {successMessage} </strong></div> }
            {errorMessage && <div className="text-center alert alert-warning"> <strong>{errorMessage} </strong></div> }
        {/* <DataTable  
            data={desiglist}
            columns={[
                {title : 'Sr' , data: 'comp_id'},
                {title : 'Designation Name' , data: 'comp_name'},
                {title : 'Action' , data: 'comp_id',render : function(data,type ,row){
                    return `<Button type="submit" variant="contained" color="primary" className="m-3" data-id="${row.id}"><EditSquareIcon /> Update</Button>`
                    // return `<button className="btn btn-primary" data-id="${row.id}" >Update</button>`
                } } 
            ]}
            options={{
                searching: true,
                paging: true,
                ordering: true,
                info: true,
                responsive: true
            }}
        /> */}

            <table ref={tableRef} className="table table-striped table-hover display">
                <thead>
                    <tr >
                        <th>Sr No.</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {desiglist.length === 0 ? (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>
                                No data available
                            </td>
                        </tr>
                        ) : (
                        desiglist.map((desig,index) => (
                            <tr key={desig.desig_id}>
                            <td>{index+1}</td>
                            <td>{desig.desig_name}</td>
                            <td>
                                <Button type="submit" variant="contained" color="success" onClick={() => updateDesignation(desig.desig_id)} > <Tooltip arrow placement="left" title={`Update ${desig.desig_name}`}> <EditSquareIcon />&nbsp;Update</Tooltip></Button>
                            </td>
                            </tr>
                        ))
                        )}
                </tbody>
            </table>
        </div>
    )
}