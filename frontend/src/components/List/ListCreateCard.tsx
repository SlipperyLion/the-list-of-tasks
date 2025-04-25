import Plus from "../../assets/plus.svg"
import "../../styles/ListCreateCardStyle.css"

interface ListCreateCardProps{
    onCLick:()=>void;
}

function ListCreateCard({onCLick}:ListCreateCardProps){
    return(
        <div className="list-create-button" onClick={onCLick}>
            <div className="title">Click to create new list</div>
            <div className="plus-circle">
                <img src={Plus} alt="plus" style={{width: '24px', height: '24px'}}/>
            </div>
        </div>
    )
}

export default ListCreateCard;