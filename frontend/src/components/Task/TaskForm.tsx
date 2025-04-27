import React, {useState} from "react";
import "../../styles/ListFormStyle.css"
interface TaskFormProps{
    onSubmit: (title: string) => void;
    closeModal: () => void;
}


function TaskForm({onSubmit, closeModal}: TaskFormProps){
    const [title, setTitle] = useState("");

    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        onSubmit(title);
        closeModal();
    }

    return(
        <form onSubmit={handleSubmit} className="notebook-form">
            <div className="holes">
                <div className="hole"></div>
                <div className="hole"></div>
                <div className="hole"></div>
                <div className="hole"></div>
                <div className="hole"></div>
                <div className="hole"></div>
            </div>
            <div className="form-content">
                <label>Edit task</label>
                <label> Title: </label>
                <input type="text" value={title} maxLength={128} onChange={(e) => setTitle(e.target.value)} required placeholder="Task title..."/>
                <p className={`char-counter ${title.length > 108 ? 'warning' : ''}`}> {128 -title.length} characters remaining</p>
                <div className="form-buttons">
                    <button type="submit" className="save-button">Edit</button>
                    <button type="button" onClick={() => closeModal()} className="cancel-button">Cancel</button>
                </div>
            </div>
        </form>

    )
}

export default TaskForm;