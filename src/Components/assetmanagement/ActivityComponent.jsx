import $ from 'jquery'; // jQuery is required for DataTables to work
import { useEffect, useState } from "react"
import { getAllActivities } from "./api/ActivitApiService";

import DataTable from 'datatables.net-react'; // DataTables React integration
import DT from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS styles
import 'datatables.net'; // DataTables core functionality

DataTable.use(DT);

export default function Activites() {

    const [activities,setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(
        () => retriveAllActivites() , []
    )

    function retriveAllActivites() {
        getAllActivities().then((response) => { 
            setActivities(response.data)
            setLoading(false); // Data has loaded
        })
    }
 
    return(
        <div className="container">
            <h2> View Activities </h2>
           <DataTable 
            data={activities}
            columns={[
                { title: 'ID', data: 'activity_id' },
                { title: 'Activity Name', data: 'activity' },
                { title: 'Date', data: 'operation_date' },
                { title: 'Time', data: 'operation_time' }
            ]}
            options={{
                searching: true,
                paging: true,
                ordering: true,
                info: true,
                responsive: true
            }}
           />
                      
        </div>
    )
}