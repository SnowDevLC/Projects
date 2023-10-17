import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Home, Detail, Form } from "./views";
import { Footer, Nav } from "./components";

function App() {
    const location = useLocation();
    
    return (
        <div className="container">
            {location.pathname !== "/" && <Nav />}
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/form" element={<Form />} />
            </Routes>
            {location.pathname !== "/" && <Footer />}
        </div>
    );
}

export default App;

