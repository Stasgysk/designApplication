import './App.css';
import {Route, Routes} from "react-router-dom"
import Login from "./pages/Login";
import {useCookies} from "react-cookie";
import Main from "./pages/Main";
import {useEffect} from "react";


function App() {
    const [cookies] = useCookies(["user"]);

    useEffect(() => {

    }, [cookies]);

    console.log(cookies.user);

    return (
    <div id="container-background">
        <div id="container">
            <Routes>
                {cookies?.user ? (
                    <Route path="/" element={<Main/>}/>
                ) : (
                    <Route path="/" element={<Login/>}/>
                )}
            </Routes>
        </div>
    </div>
    );
}

export default App;
