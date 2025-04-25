import ListCreateCard from "../components/List/ListCreateCard.tsx";
import {useState} from "react";
import ListCreateModal from "../components/List/ListCreateModal.tsx";

function Lists(){
    const [showModal, setShowModal] = useState(false);
    function closeModal(){
        setShowModal(false);
    }
    function openModal(){
        setShowModal(true);
    }
    function handleSubmit(){
        alert("YAYYYYY")
    }
    return (
        <>
            <div style={{ display: 'flex' , alignItems: 'center' }}>
                <h1>Lists PAGEEE!!</h1>
                <ListCreateCard onCLick={openModal}></ListCreateCard>
            </div>
            {showModal && (<ListCreateModal onSubmit={handleSubmit} closeModal={closeModal}/>)}
        </>
    )
}
export default Lists