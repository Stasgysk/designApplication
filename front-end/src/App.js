import './App.css';
import {Route, Routes} from "react-router-dom"
import Login from "./pages/Login";
import {useCookies} from "react-cookie";
import Main from "./pages/Main";
import {useEffect, useState} from "react";
import {getUsers} from "./api/user.service";
import {getProjects} from "./api/project.service";


function App() {
    const [cookies, setCookie] = useCookies(["jwtToken","user", "projects"]);
    const [projects, setProjects] = useState({});

    useEffect(() => {
        init();
    }, []);

    function init() {
        if(cookies?.user && cookies?.jwtToken){
            const body = {
                username: cookies.user.username.toString(),
                email: cookies.user.email.toString(),
                picture: cookies.user.picture.toString(),
                jwt: cookies.jwtToken
            };
            getUsers(body).then((response) => {

            });
            const bodyProjects = {
                username: cookies.user.username.toString(),
                email: cookies.user.email.toString(),
                picture: cookies.user.picture.toString(),
                jwt: cookies.jwtToken
            };
            getProjects(bodyProjects).then((response) => {
                setCookie("projects", response.data, { path: "/" });
            });
        }
    }

    return (
        <div id="container-background">
            <div id="container-background-photo">
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
        </div>
    );
}

export default App;
