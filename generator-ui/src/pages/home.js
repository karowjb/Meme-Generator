import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllMemes from "./AllMemes.js";
import Header from "../components/Header.js";
import App from "../App.js";
import AllQuotes from "./AllQuotes.js";
import NavBar from "../components/NavBar.js";

function Home() {
    return (
        <Router>
            <Header />
            <NavBar></NavBar>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/AllMemes" element={<AllMemes />} />
                <Route exact path="/AllQuotes" element={<AllQuotes />} />
            </Routes>
        </Router>
    );
}

export default Home;
