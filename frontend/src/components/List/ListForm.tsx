import React, {useState} from "react";
import "../../styles/ListFormStyle.css"
interface ListFormProps{
    onSubmit: (title: string, description: string) => void;
    closeModal: () => void;
}


function ListForm({onSubmit, closeModal}: ListFormProps){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        onSubmit(title, description);
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
                <label>Create new list</label>
                <label> Title: </label>
                <input type="text" value={title} maxLength={128} onChange={(e) => setTitle(e.target.value)} required/>
                <label>Description:</label>
                <textarea value={description} cols={5} maxLength={512} onChange={(e) => setDescription(e.target.value)}/>
                <div className="form-buttons">
                    <button type="submit" className="save-button">Create</button>
                    <button type="button" onClick={() => closeModal()} className="cancel-button">Cancel</button>
                </div>
            </div>
        </form>

    )
}

export default ListForm;