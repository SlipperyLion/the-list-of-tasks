import {Link, useLocation, useNavigate} from "react-router-dom";

function Header(){
    const location = useLocation();
    const navigate = useNavigate();
    let headerText = "";
    if(location.pathname == "/"){
        headerText = "Your Lists";
    }else if(location.pathname == "/About"){
        headerText = "About Us";
    }else if(location.pathname.startsWith("/list/")){
        headerText = "List of Tasks";
    }
    function RouteToLists(){
        navigate("/");
    }

    return (
        <header className="app-header">
            <div className="app-title-wrapper" onClick={RouteToLists}>
                <img className="app-logo" src="/favicons/android-chrome-192x192.png" alt="TL" />
                <p> The List Of Tasks</p>
            </div>

            <p>{headerText}</p>

            <nav>
                <Link to="/">Lists</Link>
                <Link to="/About">About</Link>
            </nav>
        </header>
    )
}
export default Header;