import KebabMenu from "../components/UI/KebabMenu.tsx";
import {useState} from "react";
import ListCreateModal from "../components/List/ListCreateModal.tsx";

function Lists(){
    const [showModal, setShowModal] = useState(false);
    function handleModal(){
        setShowModal(false);
    }
    function handleSubmit(){
        alert("YAYYYYY")
    }
    return (
        <>
            <div style={{ display: 'flex' , alignItems: 'center' }}>
                <h1>Lists PAGEEE!!</h1>
                <KebabMenu onEdit={()=>setShowModal(true)} onDelete={()=>alert("B")}></KebabMenu>
            </div>
            {showModal && (<ListCreateModal onSubmit={handleSubmit} closeModal={handleModal}/>)}
        </>
    )
}
export default Lists