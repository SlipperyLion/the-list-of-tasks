import { useState } from 'react';

interface KebabMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

function KebabMenu({ onEdit, onDelete }: KebabMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="kebab-container" style={{ position: 'relative' }}>
            <button onClick={() => setIsOpen(!isOpen)}>⋮</button>
            {isOpen && (
                <ul className="kebab-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    listStyle: 'none',
                    margin: 0,
                    padding: '4px 0',
                }}>
                    <li onClick={onEdit} style={{ padding: '8px 16px', cursor: 'pointer' }}>Edit</li>
                    <li onClick={onDelete} style={{ padding: '8px 16px', cursor: 'pointer' }}>Delete</li>
                </ul>
            )}
        </div>
    );
}

export default KebabMenu;