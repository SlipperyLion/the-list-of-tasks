import "../../styles/KebabMenuStyle.css"
interface KebabMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

function KebabMenu({ isOpen, onToggle, onEdit, onDelete }: KebabMenuProps) {
    function handleKebabPropogation(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }
    function handleEdit(){
        onEdit();
        onToggle();
    }
    function handleDelete(){
        onDelete();
        onToggle();
    }
    return (
        <div className={`kebab-container ${isOpen ? 'open' : ''}`} onClick={handleKebabPropogation}>
            <button onClick={onToggle}>⋮</button>
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