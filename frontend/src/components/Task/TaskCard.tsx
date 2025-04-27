import "../../styles/TaskCardStyle.css"
import KebabMenu from "../UI/KebabMenu.tsx";
import {TaskSchema} from "../../models/TaskSchema.ts";


interface TaskCardProps{
    task: TaskSchema
    isOpen: boolean
    onStar:(task:TaskSchema) => void
    onCheck:(task:TaskSchema) => void
    onEdit:(task:TaskSchema) => void;
    onDelete:(id: number) => void;
    onToggle:() => void;
}

function TaskCard({task,isOpen, onStar,onCheck,onEdit,onDelete, onToggle}: TaskCardProps){

    function handleStar(){
        onStar(task)
    }
    function handleCheck(){
        onCheck(task)
    }
    function handleEdit(){
        onEdit(task);
    }
    function handleDelete(){
        onDelete(task.id)
    }
    return(
        <div className={`task-item${task.is_priority ? ' starred' : ''}`}>
            <input type="checkbox" checked={task.is_checked} className="task-checkbox" onClick={handleCheck}/>
            <svg xmlns="http://www.w3.org/2000/svg"  className={`task-star${task.is_priority ? ' starred' : ''}`} onClick={handleStar} viewBox="0 0 24 24" >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19
               8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="task-title">{task.title}</span>
            <KebabMenu isOpen={isOpen} onEdit={handleEdit} onDelete={handleDelete} onToggle={onToggle}></KebabMenu>
        </div>
    )
}

export default TaskCard;