import {useParams} from "react-router-dom";
import TaskCreateBar from "../components/Task/TaskCreateBar.tsx";
import {TaskSchema, TaskCreate, TaskPatch} from "../models/TaskSchema.ts";
import {useEffect, useState} from "react";
import {getAllTasks, createTask, patchTask} from "../api/taskService.ts";
import "../styles/ListDetailPageStyle.css"
import TaskCard from "../components/Task/TaskCard";

function ListDetailPage(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState<TaskSchema[]>([]);
    const [holeCount, setHoleCount] = useState(6);
    const [list_id, setListId] = useState<number>(0);
    const {list_id_string} = useParams()

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
                const response = await getAllTasks(Number(list_id_string)) /* Using list_id clashes with async*/
                const sortedData = response.sort((a, b) => {
                    // Sort by priority first (true before false)
                    if (a.is_priority !== b.is_priority) {
                        return b.is_priority ? 1 : -1;
                    }
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
                setData(sortedData);
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

    // Hole amount changing useEffect()
    useEffect(() => {
        const updateHoleCount = () => {
            const container = document.querySelector(".task-notebook-page");
            if (container) {
                const height = container.clientHeight;
                const spacing = 40; // space between holes in px
                const count = Math.floor(height / spacing);
                setHoleCount(count);
            }
        };

        updateHoleCount(); // run initially
        window.addEventListener("resize", updateHoleCount); // update on resize

        return () => window.removeEventListener("resize", updateHoleCount);
    }, [data]); // run again when the task list changes

    function handleCreate(title:string){
        const addTask = async (task: TaskCreate) => {
            try{
                const response = await createTask(task)
                setData(prevList => [...prevList, response]);
            } catch (error) {
                console.log(error)
                setError("Error creating task.");
            } finally {
                alert("Successfully created task.");
            }
        }
        addTask({title, is_checked:false, is_priority:false, list_id})
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
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
                setData(sortedList);
            } catch (error) {
                console.log(error)
                setError("Error changin priority of task.");
            } finally {
                alert("Successfully changed priority of task.");
            }
        }
        patchPriorityTask({is_priority:(!task.is_priority)})
    }
    function handleCheck(task: TaskSchema){
        const patchPriorityTask = async (taskPatch: TaskPatch) => {
            try{
                await patchTask(task.id, taskPatch)
            } catch (error) {
                console.log(error)
                setError("Error changin priority of task.");
            } finally {
                alert("Successfully changed priority of task.");
            }
        }
        patchPriorityTask({is_checked:(!task.is_checked)})
    }


    function handleEdit(task:TaskSchema){
        alert("EDIT")
    }
    function handleDelete(id:number){
        alert("DELETE")
    }
    return (
        <div className="task-notebook-page">
            <div className="holes">
                <div className="holes">
                    {[...Array(holeCount)].map((_, index) => (
                        <div className="hole" key={index}></div>
                    ))}
                </div>
            </div>
            <div className="task-content">
                <div className="list-title">Work Tasks</div>
                <div className="list-description">Tasks to complete by the end of the sprint.</div>
                <div className="top-bar">
                    <TaskCreateBar onClick={handleCreate}/>
                </div>
                <div className="task-list">
                    {data.map((task: TaskSchema) => (
                        <TaskCard
                        task={task}
                        onStar={handleStar}
                        onCheck={handleCheck}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListDetailPage;