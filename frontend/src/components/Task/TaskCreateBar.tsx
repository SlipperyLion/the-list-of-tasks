import "../../styles/TaskCreateStyle.css"
import React, {useState} from "react";

interface TaskCreateBarProps {
    onSubmit: (title: string) => void;
}

function TaskCreateBar({onSubmit}: TaskCreateBarProps) {
    const [title, setTitle] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        onSubmit(title);
        setTitle("");
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 150);
    }
    return (
        <form className="task-create-container" onSubmit={handleSubmit}>
            <input type="text" value={title} maxLength={128} className="task-input" onChange={(e) => setTitle(e.target.value)} required placeholder="New task title..."/>
            <button type="submit" className={`create-button ${isClicked ? 'shrunk' : ''}`} >+ Create</button>
        </form>
    )
}

export default TaskCreateBar