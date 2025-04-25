import Plus from "../../assets/plus.svg"
import "../../styles/ListCreateCardStyle.css"

interface ListCreateCardProps{
    onClick:()=>void;
}

function ListCreateCard({onClick}:ListCreateCardProps){
    return(
        <div className="list-create-button" onClick={onClick}>
            <div className="title">Click to create new list</div>
            <div className="plus-circle">
                <img src={Plus} alt="plus" style={{width: '24px', height: '24px'}}/>
            </div>
        </div>
    )
}

export default ListCreateCard;