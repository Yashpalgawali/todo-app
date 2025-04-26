import { useEffect, useRef, useState } from "react"
import { retrieveAllCompanies } from "../api/CompanyApiService"
import { useNavigate } from "react-router-dom"
import EditSquareIcon from '@mui/icons-material/EditSquare';
import $ from 'jquery'; // jQuery is required for DataTables to work
 
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

export default function ViewCompanyComponent() {

    const [complist,setCompList] = useState([])
    const [successMessage , setSuccessMessage] = useState('')
    const [errorMessage , setErrorMessage] = useState('')

    const tableRef = useRef(null); // Ref for the table

    const navigate = useNavigate()

    useEffect(()=> refreshCompanies() , [] )
    
    useEffect(() => {
        // Initialize DataTable only after the component has mounted
        if (tableRef.current && complist.length >0 ) {
          $(tableRef.current).DataTable(); // Initialize DataTables
        }
      }, [complist]); // Re-initialize DataTables when activities data changes
   

    function refreshCompanies() {
        if(sessionStorage.getItem('response')!=''){
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
        retrieveAllCompanies().then((response)=> {
            setCompList(response.data)
        })
    }  

    function addNewCompany() {
        navigate(`/company/-1`)
    }

    function updateCompany(id) {
        navigate(`/company/${id}`)
    }

    return(
        <div className="container">
            <h2 className="text-center m-4">View Company <button type="submit" style={ { float: 'right !important' } } className="btn btn-primary" onClick={addNewCompany} ><strong>Add Company</strong></button> </h2>
            {successMessage && <div className="text-center alert alert-success"> {successMessage} </div> }
            {errorMessage && <div className="text-center alert alert-warning"> {errorMessage} </div> }
        {/* <DataTable  
            data={complist}
            columns={[
                {title : 'Sr' , data: 'comp_id'},
                {title : 'Company Name' , data: 'comp_name'},
                {title : 'Company Name' , data: 'comp_name'}
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
                        <th>Company Name</th>
                        <th>UPDATE</th>
                    </tr>
                </thead>
                <tbody>
                     {
                        
                        complist.map(
                            comp => (
                                <tr key={comp.comp_id}>
                                    <td>{comp.comp_id}</td>
                                    <td>{comp.comp_name}</td>
                                    <td> <button type="submit" className="btn btn-success" onClick= {()=>updateCompany(comp.comp_id)}><EditSquareIcon /> UPDATE</button> </td>
                                </tr>
                            )
                        )
                     }
                </tbody>
            </table>
        </div>
    )
}