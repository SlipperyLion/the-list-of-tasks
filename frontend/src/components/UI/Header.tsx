import {Link, useLocation} from "react-router-dom";

function Header(){
    const location = useLocation();
    let headerText = "";
    if(location.pathname == "/"){
        headerText = "Your Lists";
    }else if(location.pathname == "/About"){
        headerText = "About Us";
    }else if(location.pathname.startsWith("/list/")){
        headerText = "List of Tasks";
    }

    return (
        <header className="app-header">
            <p> The List Of Tasks</p>
            <p>{headerText}</p>

            <nav>
                <Link to="/">Lists</Link>
                <Link to="/About">About</Link>
            </nav>
        </header>
    )
}
export default Header;