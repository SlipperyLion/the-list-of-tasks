import "../../styles/ModalStyle.css"
import ListForm from "./ListForm";

interface CreateModalProps{
    isEdit:boolean;
    onSubmit: (title: string, description: string) => void;
    closeModal: () => void;
}

function ListCreateModal({isEdit,onSubmit, closeModal}: CreateModalProps) {

    return(
        <div className="modal-backdrop">
            <div>
                <ListForm isEdit ={isEdit} onSubmit={onSubmit} closeModal={closeModal} />
            </div>
        </div>
    )

}

export default ListCreateModal;