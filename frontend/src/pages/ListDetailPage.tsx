import {useParams} from "react-router-dom";

function ListDetailPage(){

    const {list_id} = useParams()
    return (
        <>
            <h1> THIS IS PAGE FOR LIST {list_id}</h1>
        </>
    )
}

export default ListDetailPage;