import "../../styles/TaskCreateStyle.css"
import {useState} from "react";

interface TaskCreateBarProps {
    onClick: (title: string) => void;
}

function TaskCreateBar({onClick}: TaskCreateBarProps) {
    const [title, setTitle] = useState("");
    function handleClick(){
        onClick(title);
    }
    return (
        <>
            <input type="text" className="task-input" onChange={(e) => setTitle(e.target.value)} placeholder="New task title..."/>
            <button className="create-button" onClick={handleClick} >+ Create</button>
        </>
    )
}

export default TaskCreateBar