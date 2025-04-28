import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Lists from "./pages/Lists.tsx";
import About from './pages/About'
import ListDetailPage from "./pages/ListDetailPage.tsx";
import Header from "./components/UI/Header.tsx"
import Footer from "./components/UI/Footer.tsx"

function App() {

  return (
    <>
        <Router>
            <Header/>
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<Lists />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/list/:list_id_string" element={<ListDetailPage />} />
                </Routes>
            </div>
            <Footer/>
        </Router>
    </>
  );
}

export default App
