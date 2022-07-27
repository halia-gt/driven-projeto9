import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/index.css";
import Header from "./Header";
import Home from "./Home";
import Time from "./Time";
import Seats from "./Seats";
import Sucess from "./Sucess";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/1" element={<Time />} />
                <Route path="/sessao/1" element={<Seats />} />
                <Route path="/sucesso" element={<Sucess />} />
            </Routes>
        </BrowserRouter>
    );
}