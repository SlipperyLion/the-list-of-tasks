import "../../styles/ModalStyle.css"
import ListForm from "./ListForm";

interface CreateModalProps{
    onSubmit: (title: string, description: string) => void;
    closeModal: () => void;
}

function ListCreateModal({onSubmit, closeModal}: CreateModalProps) {

    function handleCloseModal(){
        closeModal();
    }
    return(
        <div className="modal-backdrop">
            <div className="modal-content">
                <ListForm onSubmit={onSubmit} closeModal={handleCloseModal} />
            </div>
        </div>
    )

}

export default ListCreateModal;