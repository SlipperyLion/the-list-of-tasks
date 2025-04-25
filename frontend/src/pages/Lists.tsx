import KebabMenu from "../components/UI/KebabMenu.tsx";

function Lists(){
    return (
        <>
            <div style={{ display: 'flex' , alignItems: 'center' }}>
                <h1>Lists PAGEEE!!</h1>
                <KebabMenu onEdit={()=>alert("A")} onDelete={()=>alert("B")}></KebabMenu>
            </div>
        </>
    )
}
export default Lists