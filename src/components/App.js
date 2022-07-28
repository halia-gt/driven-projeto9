import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/index.css";
import Header from "./Header";
import Home from "./Home";
import Sessions from "./Sessions";
import Seats from "./Seats";
import Sucess from "./Sucess";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:movieId" element={<Sessions />} />
                <Route path="/sessao/:sessionId" element={<Seats />} />
                <Route path="/sucesso" element={<Sucess />} />
            </Routes>
        </BrowserRouter>
    );
}