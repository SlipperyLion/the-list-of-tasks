import "../../styles/TaskCardStyle.css"
import {useState} from "react";
import KebabMenu from "../UI/KebabMenu.tsx";
import {TaskSchema} from "../../models/TaskSchema.ts";


interface TaskCardProps{
    task: TaskSchema
    onStar:(task:TaskSchema) => void
    onCheck:(task:TaskSchema) => void
    onEdit:(task:TaskSchema) => void;
    onDelete:(id: number) => void;
}

function TaskCard({task,onStar,onCheck,onEdit,onDelete}: TaskCardProps){
    const[isStarred, setIsStarred] = useState<boolean>(task.is_priority)
    const[isChecked, setIsChecked] = useState<boolean>(task.is_checked)

    function handleStar(){
        onStar(task)
        setIsStarred(!isStarred)
    }
    function handleCheck(){
        onCheck(task)
        setIsChecked(!isChecked)
    }
    function handleEdit(){
        onEdit(task);
    }
    function handleDelete(){
        onDelete(task.id)
    }
    return(
        <div className={`task-item${isStarred ? ' starred' : ''}`}>
            <input type="checkbox" checked={isChecked} className="task-checkbox" onClick={handleCheck}/>
            <svg xmlns="http://www.w3.org/2000/svg"  className={`task-star${isStarred ? ' starred' : ''}`} onClick={handleStar} viewBox="0 0 24 24" >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19
               8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="task-title">{task.title}</span>
            <KebabMenu onEdit={handleEdit} onDelete={handleDelete}></KebabMenu>
        </div>
    )
}

export default TaskCard;