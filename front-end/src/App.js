import './App.css';
import {Route, Routes} from "react-router-dom"
import Login from "./pages/Login";
import {useCookies} from "react-cookie";
import Main from "./pages/Main";
import {useEffect, useState} from "react";
import {getUsers} from "./api/user.service";
import {getProjectById, getProjects} from "./api/project.service";
import ProjectScreen from "./pages/ProjectScreen";


function App() {
    const [cookies, setCookie] = useCookies(["jwtToken","user", "projects"]);
    const [projects, setProjects] = useState({});
    const [currProject, setCurrProject] = useState(null);

    useEffect(() => {
        init();
    }, [currProject]);

    function setCurrProjectOnClick(id) {
        if(id === null) {
            setCurrProject(null);
            return;
        }
        const body = {
            jwt: cookies.jwtToken,
            id: id,
            username: cookies.user.username
        }
        getProjectById(body).then((response) => {
            setCurrProject(response.data);
        });
    }

    function init() {
        if(cookies?.user && cookies?.jwtToken && cookies.user?.username){
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
                            <Route path="/" element={
                                currProject ? (
                                    <ProjectScreen currProject={currProject} setCurrProject={setCurrProject} userName={cookies.user.username.toString()}/>
                                    ) : (
                                    <Main setCurrProject={setCurrProjectOnClick}/>
                                    )
                            }/>
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
