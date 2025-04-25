import {ListSchema} from "../../models/ListSchema.ts";
import KebabMenu from "../UI/KebabMenu.tsx";
import "../../styles/ListCardStyle.css"

interface ListCardProps{
    list: ListSchema;
    onClick:() => void;
    onEdit: (list: ListSchema) => void;
    onDelete: (id: number) => void;

}

function ListCard({list, onEdit, onDelete, onClick}: ListCardProps){

    function handleEdit(){
        onEdit(list);
    }
    function handleDelete(){
        onDelete(list.id);
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
            <div className="notebook-page" onClick={onClick}>
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
                <KebabMenu onEdit={handleEdit} onDelete={handleDelete}></KebabMenu>
            </div>
        </>
    )
}

export default ListCard;
