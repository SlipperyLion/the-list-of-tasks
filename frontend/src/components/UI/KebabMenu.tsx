import { useState } from 'react';
import "../../styles/KebabMenuStyle.css"
interface KebabMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

function KebabMenu({ onEdit, onDelete }: KebabMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    function handleKebabPropogation(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }
    function handleEdit(){
        onEdit();
        setIsOpen(!isOpen);
    }
    function handleDelete(){
        onDelete();
        setIsOpen(!isOpen);
    }
    return (
        <div className="kebab-container" onClick={handleKebabPropogation}>
            <button onClick={() => setIsOpen(!isOpen)}>⋮</button>
            {isOpen && (
                <ul className="kebab-menu" >
                    <li onClick={handleEdit} className = "kebab-button">Edit</li>
                    <li onClick={handleDelete} className="kebab-button">Delete</li>
                </ul>
            )}
        </div>
    );
}

export default KebabMenu;