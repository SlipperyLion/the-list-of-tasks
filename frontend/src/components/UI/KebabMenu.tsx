import { useState } from 'react';
import "../../styles/KebabMenuStyle.css"
interface KebabMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

function KebabMenu({ onEdit, onDelete }: KebabMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="kebab-container">
            <button onClick={() => setIsOpen(!isOpen)}>⋮</button>
            {isOpen && (
                <ul className="kebab-menu" >
                    <li onClick={onEdit} className = "kebab-button">Edit</li>
                    <li onClick={onDelete} className="kebab-button">Delete</li>
                </ul>
            )}
        </div>
    );
}

export default KebabMenu;