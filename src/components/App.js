import "../assets/css/reset.css";
import "../assets/css/index.css";
import Header from "./Header";
import Home from "./Home";
import Time from "./Time";
import Seats from "./Seats";

export default function App() {
    return (
        <>
            <Header />
            {/* <Home /> */}
            {/* <Time /> */}
            <Seats />
        </>
    );
}