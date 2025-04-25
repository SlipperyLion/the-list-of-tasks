import ListCreateCard from "../components/List/ListCreateCard.tsx";
import {useState} from "react";
import ListCreateModal from "../components/List/ListCreateModal.tsx";
import ListCard from "../components/List/ListCard.tsx";
import {ListSchema} from "../models/ListSchema.ts";
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
    function handleEdit(){
        alert("EDIT")
    }
    const dummyList: ListSchema = {
        id: 42,
        title: "Example list for doing stuff",
        description: "Example description with many and many chars because why not? YOu can do so so why no",
        created_at: "2024-03-10T10:15:00Z",
        updated_at: "2024-04-20T14:45:00Z"
    };
    return (
        <>
            <div style={{ display: 'flex' , alignItems: 'center' }}>
                <h1>Lists PAGEEE!!</h1>
                <ListCreateCard onClick={openModal}></ListCreateCard>
                <ListCard list={dummyList} onEdit={handleEdit} onDelete={handleSubmit} onClick={handleSubmit}></ListCard>
            </div>
            {showModal && (<ListCreateModal onSubmit={handleSubmit} closeModal={closeModal}/>)}
        </>
    )
}
export default Lists