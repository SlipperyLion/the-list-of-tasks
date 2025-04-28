import ListCreateCard from "../components/List/ListCreateCard.tsx";
import {useState, useEffect} from "react";
import ListModal from "../components/List/ListModal.tsx";
import ListCard from "../components/List/ListCard.tsx";
import {ListSchema, ListUpdate} from "../models/ListSchema.ts";
import {getAllLists, deleteList, createList, updateList} from "../api/listService.ts"
import "../styles/ListsPageStyle.css"
import {useNavigate} from 'react-router-dom'
import {Toaster, toast} from "react-hot-toast";

function Lists(){
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [kebabListId, setKebabListId] = useState<number | null>(null);
    const [editListId, setEditListId] = useState<number | null>(null);
    const [data, setData] = useState<ListSchema[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
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
        if(!showModal) {
            setShowModal(true);
        } else {
            setTimeout(() => setShowModal(false), 150);
        }
    }
    function toggleKebabMenu(id: number){
        setKebabListId((prev) => (prev === id ? null : id));
    }
    function toggleEditModal(list?: ListSchema){
        if(list){
            setEditListId(list.id);
            setShowEditModal(true);
        } else{
            setEditListId(null);
            setShowEditModal(false)
        }
    }
    function handleSubmit(title:string, description:string){
        const addList = async()=>{
            try {
                const response = await createList({title,description});
                setData(prevList => [response, ...prevList]);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        toast.promise(addList(), {
            loading: "Creating List",
            success: "List Created!",
            error: "Error creating list",
        })

    }
    function handleDelete(id:number){
        const deleteData = async(id:number)=>{
            try {
                await deleteList(id);
                const sortedData = data.filter(item => item.id !== id);
                setData(sortedData)
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        toast.promise(deleteData(id), {
            loading: "Deleting List",
            success: "List Deleted!",
            error: "Error deleting list",
        })

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
                console.error(error);
                throw error;
            }
        }
        toast.promise(updateData({title,description}), {
            loading: "Updating List!",
            success: "List Updated!",
            error: "Error updating list",
        })

    }

    function RouteToList(id: number, list_title:string, list_description:string){
        const dataToPass = {title: list_title, description: list_description};
        navigate(`/list/${id}`, {state: dataToPass});

    }

    if (loading){return <div>Loading...</div>}
    if (error) return <div>{error}</div>;


    return (
        <>
            <Toaster position="bottom-center" containerStyle={{top:50, right:100}} toastOptions={{
                success: {style:{scale:1.4 , background: '#fffdf5', borderLeft: '8px solid #d23f31'}},
                error: {style:{scale:1.4 , background: '#fffdf5', borderLeft: '8px solid #d23f31'}},
                loading: {style:{scale:1.4 , background: '#fffdf5', borderLeft: '8px solid #d23f31'}}

            }} />
            {showModal && (<ListModal isEdit={false} onSubmit={handleSubmit} closeModal={toggleModal}/>)}
            {showEditModal && (<ListModal isEdit={true} onSubmit={handleEdit} closeModal={toggleEditModal}/>)}
            <div className="list-manager">
                <div className="list-cards-container">
                    <div className="list-cards-container">
                        <ListCreateCard onClick={toggleModal} />
                        {data.map((list: ListSchema) => (
                            <ListCard
                                list={list}
                                isOpen={kebabListId === list.id}
                                onEdit={toggleEditModal}
                                onDelete={handleDelete}
                                onClick={RouteToList}
                                onToggle={()=>toggleKebabMenu(list.id)}
                            />
                        ))}</div>
                </div>
            </div>
        </>
    );
}
export default Lists