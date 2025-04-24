import { useEffect } from "react"
import { useParams } from "react-router-dom"

export default function RetriveAssets() {

    const {id} = useParams()
    useEffect(
        () => {
            alert(id)
        }, []
    )

    return(
        <div className="container">
            <h2 className="text-center">Retrieve All Assets</h2>
        </div>
    )
}