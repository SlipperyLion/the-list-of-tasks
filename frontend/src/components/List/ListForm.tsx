import React, {useState} from "react";
import "../../styles/ListFormStyle.css"
interface ListFormProps{
    isEdit:boolean
    onSubmit: (title: string, description: string) => void;
    closeModal: () => void;
}


function ListForm({isEdit,onSubmit, closeModal}: ListFormProps){
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
                <label>{isEdit? "Edit list" : "Create new list"}</label>
                <label> Title: </label>
                <input type="text" value={title} maxLength={128} onChange={(e) => setTitle(e.target.value)} required/>
                <p className={`char-counter ${title.length > 108 ? 'warning' : ''}`}> {128 -title.length} characters remaining</p>
                <label>Description:</label>
                <textarea value={description} cols={8} maxLength={512} onChange={(e) => setDescription(e.target.value)}/>
                <p className={`char-counter ${description.length > 462 ? 'warning' : ''}`}> {512 -description.length} characters remaining</p>
                <div className="form-buttons">
                    <button type="submit" className="save-button">{isEdit? "Edit" : "Create"}</button>
                    <button type="button" onClick={() => closeModal()} className="cancel-button">Cancel</button>
                </div>
            </div>
        </form>

    )
}

export default ListForm;