import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Lists from "./pages/Lists.tsx";
import About from './pages/About'
import ListDetailPage from "./pages/ListDetailPage.tsx";
import Header from "./components/UI/Header.tsx"


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
