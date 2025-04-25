import "../../styles/ModalStyle.css"
import ListForm from "./ListForm";

interface CreateModalProps{
    isEdit:boolean;
    onSubmit: (title: string, description: string) => void;
    closeModal: () => void;
}

function ListCreateModal({isEdit,onSubmit, closeModal}: CreateModalProps) {

    function handleCloseModal(){
        closeModal();
    }
    return(
        <div className="modal-backdrop">
            <div className="modal-content">
                <ListForm isEdit ={isEdit} onSubmit={onSubmit} closeModal={handleCloseModal} />
            </div>
        </div>
    )

}

export default ListCreateModal;