import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import './App.css'
import Lists from "./pages/Lists.tsx";
import About from './pages/About'
import ListDetailPage from "./pages/ListDetailPage.tsx";

function Header(){
    return (
        <header className="app-header">
            <p> The List Of Tasks</p>
            <nav>
                <Link to="/">Lists</Link>
                <Link to="/About">About</Link>
            </nav>
        </header>
    )
}

function App() {

  return (
    <>
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Lists />} />
                <Route path="/about" element={<About />} />
                <Route path="/list/:list_id_string" element={<ListDetailPage />} />
            </Routes>
        </Router>
    </>
  );
}

export default App
