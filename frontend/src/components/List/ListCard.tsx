import {ListSchema} from "../../models/ListSchema.ts";
import KebabMenu from "../UI/KebabMenu.tsx";
import "../../styles/ListCardStyle.css"

interface ListCardProps{
    list: ListSchema;
    isOpen: boolean;
    onClick: (id:number,  title:string, description:string) => void;
    onEdit: (list: ListSchema) => void;
    onDelete: (id: number) => void;
    onToggle: () => void;

}

function ListCard({list, isOpen, onEdit, onDelete, onClick, onToggle}: ListCardProps){

    function handleEdit(){
        onEdit(list);
    }
    function handleDelete(){
        onDelete(list.id);
    }
    function handleClick(){
        onClick(list.id, list.title, (list.description ? list.description : ""));
    }

    const date = new Date(list.updated_at);
    const formattedDate = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    return (
        <>
            <div className="notebook-page" onClick={handleClick}>
                <div className="holes">
                    <div className="hole"></div>
                    <div className="hole"></div>
                    <div className="hole"></div>
                    <div className="hole"></div>
                    <div className="hole"></div>
                    <div className="hole"></div>
                </div>
                <div className="content">
                    <h2 className="title">{list.title}</h2>
                    <p className="description">{list.description}</p>
                    <p className="timestamp" id="last-updated">Last updated at: {formattedDate}</p>
                </div>
                <KebabMenu isOpen={isOpen} onToggle={onToggle} onEdit={handleEdit} onDelete={handleDelete}></KebabMenu>
            </div>
        </>
    )
}

export default ListCard;
