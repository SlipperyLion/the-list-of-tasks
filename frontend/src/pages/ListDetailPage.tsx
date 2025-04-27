import {useLocation, useNavigate, useParams} from "react-router-dom";
import TaskCreateBar from "../components/Task/TaskCreateBar.tsx";
import {TaskSchema, TaskCreate, TaskPatch, TaskUpdate} from "../models/TaskSchema.ts";
import {useEffect, useState} from "react";
import {getAllTasks, createTask, patchTask, updateTask, deleteTask} from "../api/taskService.ts";
import TaskEditModal from "../components/Task/TaskEditModal.tsx";
import "../styles/ListDetailPageStyle.css"
import TaskCard from "../components/Task/TaskCard";
import {getList} from "../api/listService.ts";
import {Toaster, toast} from "react-hot-toast";


function ListDetailPage(){
    const [data, setData] = useState<TaskSchema[]>([]);
    const [kebabTaskId, setKebabTaskId] = useState<number| null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [list_id, setListId] = useState<number>(0);
    const {list_id_string} = useParams()
    const navigate = useNavigate();
    const location = useLocation();

    // Data fetching useEffect()
    useEffect(()=>{
        if(list_id_string == undefined){
            return
        }
        // Regex for checking if string has only 0-9 digits.
        if(!/^\d+$/.test(list_id_string)){
            setError("Invalid list id");
            setLoading(false);
            return
        }
        setListId(Number(list_id_string));
        const fetchData = async ()  => {
            setLoading(true);
            try {
                const responseTasks = await getAllTasks(Number(list_id_string)) /* Using list_id clashes with async*/
                const sortedData = responseTasks.sort((a, b) => {
                    // Sort by priority first (true before false)
                    if (a.is_priority !== b.is_priority) {
                        return b.is_priority ? 1 : -1;
                    }
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                });
                setData(sortedData);
                // If clicked to get here, skip database call to get list details
                if(location.state){
                    setTitle(location.state.title);
                    setDescription(location.state.description);
                }else{
                    const responseList = await getList(Number(list_id_string));
                    setTitle(responseList.title);
                    setDescription(responseList.description ? responseList.description : "");
                }
            } catch (error){
                console.error(error);
                setError("Error fetching tasks.");
                throw error
            } finally{
                setLoading(false);

            }
        }
        fetchData()
    },[list_id_string])


    function handleCreate(title:string){
        const addTask = async (task: TaskCreate) => {
            try{
                const response = await createTask(task)
                if(response){
                    setData(prevList => [...prevList, response]);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        }
        toast.promise(addTask({title, is_checked:false, is_priority:false, list_id}), {
            loading: "Adding Task!",
            success: "Task Added!",
            error: "Error adding task",
        })
    }
    if(loading){
        return <div>Loading...</div>;
    }
    if(error){
        return <div>{error}</div>;
    }

    function handleStar(task: TaskSchema){
        const patchPriorityTask = async (taskPatch: TaskPatch) => {
            try{
                const response = await patchTask(task.id, taskPatch)
                const updatedList = data.map(task =>
                    task.id === response.id ? response : task
                );
                const sortedList = updatedList.sort((a, b) => {
                    if (a.is_priority !== b.is_priority) {
                        return b.is_priority ? 1 : -1;
                    }
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                });
                setData(sortedList);
            } catch (error) {
                console.log(error)
                throw error
            }
        }
        toast.promise(patchPriorityTask({is_priority:(!task.is_priority)}), {
            loading: "Prioritizing task",
            success: "Task Prioritized!",
            error: "Error prioritizing task",
        })
    }
    function handleCheck(task: TaskSchema){
        const patchPriorityTask = async (taskPatch: TaskPatch) => {
            try{
                const response = await patchTask(task.id, taskPatch)
                const updatedList = data.map(task =>
                    task.id === response.id ? response : task
                );
                setData(updatedList)
            } catch (error) {
                console.log(error)
                throw error
            }
        }
        toast.promise(patchPriorityTask({is_checked:(!task.is_checked)}), {
            loading: "Checking off task!",
            success: "Task Done!",
            error: "Error checking off task",
        })
    }

    function handleEdit(title:string){
        if(!editTaskId){
            toast.error('Error editing task, ID unknown')
            return
        }
        const updatedData = async(task:TaskUpdate) =>{
            try{
                const response = await updateTask(editTaskId, task)
                const updatedList = data.map(task =>
                    task.id === response.id ? response : task
                );
                const sortedList = updatedList.sort((a, b) => {
                    if (a.is_priority !== b.is_priority) {
                        return b.is_priority ? 1 : -1;
                    }
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                });
                setData(sortedList);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        toast.promise(updatedData({title}), {
            loading: "Updating Task!",
            success: "Task Updated!",
            error: "Error updating task",
        })

    }
    function handleDelete(id:number){
        const deletedData = async (id:number) => {
            try{
                await deleteTask(id)
                const sortedData = data.filter(item => item.id !== id);
                setData(sortedData);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        toast.promise(deletedData(id), {
            loading: "Deleting task!",
            success: "Task Deleted!",
            error: "Error deleting task",
        })
    }

    function toggleKebabMenu(id:number){
        setKebabTaskId((prev) => (prev === id ? null : id));

    }
    function toggleModal(task?: TaskSchema){
        if(task){
            setEditTaskId(task.id)
            setShowModal(true);
        }else{
            setEditTaskId(null);
            setShowModal(false)
        }
    }
    function RouteBack(){
        navigate("/");
    }
    return (
        <><Toaster position="bottom-center" containerStyle={{top:50, right:100}} toastOptions={{
            success: {style:{scale:1.4 , background: '#fffdf5', borderLeft: '8px solid #d23f31'}},
            loading: {style:{scale:1.4 , background: '#fffdf5', borderLeft: '8px solid #d23f31'}}
        }} />
        <div className="task-notebook-page">
            {showModal && (<TaskEditModal onSubmit={handleEdit} closeModal={toggleModal} />)}
            <div className="dynamic-holes">
                <div className="dynamic-hole"></div>
                <div className="dynamic-hole"></div>
                <div className="dynamic-hole"></div>
                <div className="dynamic-hole"></div>
                <div className="dynamic-hole"></div>
                <div className="dynamic-hole"></div>
                <div className="dynamic-hole"></div>
                <div className="dynamic-hole"></div>
                {data.slice(0, data.length - 4).map((_, index) => (
                    <div className="dynamic-hole" key={index}></div> // Dynamically render holes, use 4 less that in data to compensate static for min-height
                ))}
            </div>
            <div className="task-content">
                <div className="task-header">
                    <div className="task-title-wrapper">
                        <svg onClick={RouteBack} xmlns="http://www.w3.org/2000/svg" className="tasks-backarrow" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 404.43">
                            <path fill-rule="nonzero" d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z" />
                        </svg>
                    </div>
                    <div className="list-title">{title}</div>
                </div>
                <div className="list-description">{description}</div>
                <div className="top-bar">
                    <TaskCreateBar onSubmit={handleCreate}/>
                </div>
                <div id="task-list" className="task-list">
                    {data.map((task: TaskSchema) => (
                        <TaskCard
                        task={task}
                        isOpen={kebabTaskId == task.id}
                        onStar={handleStar}
                        onCheck={handleCheck}
                        onEdit={toggleModal}
                        onDelete={handleDelete}
                        onToggle={() => toggleKebabMenu(task.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default ListDetailPage;