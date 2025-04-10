import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCovCenters } from "../api/CovCenterApiService"

export default function ViewCovCenters() {
    
    const navigate = useNavigate()
    const [covcenlist ,setCovCenList] = useState([])

    useEffect(
        () => retrieveAllCovCenter, []
    )

    function retrieveAllCovCenter() {
        getAllCovCenters().then((response)=>{
            console.log(response)
                setCovCenList(response.data)
        })
    }

    function addNewCovCenter() {
        navigate(`/covcenter/-1`)
    }


    function updateCovCenter(id) {
        navigate(`/covcenter/${id}`)
    }

    function getAllCovCenterdepartments(id)
    {
        
    }
    return(
        <div className="container">
            <h1 className="text-center">View Cov Centers <button type="submit" className="btn btn-primary" onClick={addNewCovCenter}>Add CovCenter</button></h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        covcenlist.map(
                            (covcen) => (
                                <tr key={covcen.covcenter_id}>
                                    <td>{covcen.covcenter_id}</td>
                                    <td>{covcen.covcenter_name}</td>
                                    <td>
                                    <button type="submit" className="btn btn-success" onClick={()=>updateCovCenter(covcen.covcenter_id)}>Update</button> &nbsp;
                                    <button type="submit" className="btn btn-primary" onClick={()=>getAllCovCenterdepartments(covcen.covcenter_id)}>Update</button> 
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