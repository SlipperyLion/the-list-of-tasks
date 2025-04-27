import "../../styles/ModalStyle.css"
import TaskForm from "./TaskForm.tsx";

interface TaskEditModalProps{
    onSubmit: (title: string) => void;
    closeModal: () => void;
}

function TaskEditModal({onSubmit, closeModal}:TaskEditModalProps){
    return (
        <div className="modal-backdrop">
            <div>
                <TaskForm onSubmit={onSubmit} closeModal={closeModal}></TaskForm>
            </div>
        </div>
    )
}

export default TaskEditModal;