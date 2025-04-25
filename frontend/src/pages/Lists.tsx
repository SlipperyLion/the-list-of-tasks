import ListCreateCard from "../components/List/ListCreateCard.tsx";
import {useState, useEffect} from "react";
import ListModal from "../components/List/ListModal.tsx";
import ListCard from "../components/List/ListCard.tsx";
import {ListSchema, ListUpdate} from "../models/ListSchema.ts";
import {getAllLists, deleteList, createList, updateList} from "../api/listService.ts"
import "../styles/ListsPageStyle.css"

function Lists(){
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editListId, setEditListId] = useState<number | null>(null);
    const [data, setData] = useState<ListSchema[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async()=> {
            try {
                const response = await getAllLists();
                const sortedData = response.sort((a: ListSchema, b: ListSchema) => {
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(); // Sort descending by updated_at
                });
                setData(sortedData);
            } catch (error) {
                setError("Error fetching lists.");
                throw error;
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    function toggleModal(){
        setShowModal(!showModal);
    }
    function toggleEditModal(list?: ListSchema){
        if(list){
            setEditListId(list.id);
        }else{setEditListId(null);}
        setShowEditModal(!showEditModal);
    }
    function handleSubmit(title:string, description:string){
        const addList = async()=>{
            try {
                const response = await createList({title,description});
                setData(prevList => [response, ...prevList]);
            } catch (error) {
                setError("Error creating list");
                throw error;
            } finally{
                alert("Successfully created list");
            }
        }
        addList();

    }
    function handleDelete(id:number){
        const deleteData = async(id:number)=>{
            try {
                await deleteList(id);
            } catch (error) {
                setError("Error deleting list");
                throw error;
            } finally{
            alert("Successfully deleted list");
            }
        }
        deleteData(id)
        const sortedData = data.filter(item => item.id !== id);
        setData(sortedData);
    }


    function handleEdit(title:string, description:string){
        if(!editListId){
            alert("Error editing list, ID unknown")
            return
        }
        const updateData = async(list:ListUpdate)=>{
            try {
                const response = await updateList(editListId, list)
                const updatedData = data.map(item => item.id === editListId ? response : item);
                setData(updatedData.sort(
                    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                );

            } catch (error) {
                setError("Error updating list");
                throw error;
            } finally{
                alert("Successfully updated list");
            }
        }
        updateData({title,description})

    }

    function routeToList(){

    }

    if (loading){return <div>Loading...</div>}
    if (error) return <div>{error}</div>;


    return (
        <>
            {showModal && (<ListModal isEdit={false} onSubmit={handleSubmit} closeModal={toggleModal}/>)}
            {showEditModal && (<ListModal isEdit={true} onSubmit={handleEdit} closeModal={toggleEditModal}/>)}
            <div className="list-manager">
                <div className="list-cards-container">
                    <div className="list-cards-container">
                        {data.map((list: ListSchema) => (
                            <ListCard
                                list={list}
                                onEdit={toggleEditModal}
                                onDelete={handleDelete}
                                onClick={routeToList}
                            />
                        ))}
                        <ListCreateCard onClick={toggleModal} />
                    </div>
                </div>
            </div>
        </>
    );
            };
export default Lists