import './Main.css'
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {getProjects, postProject} from "../api/project.service";
import Projects from "../components/Projects";


export default function Main() {
    const [cookies, setCookie , removeCookie] = useCookies(["jwtToken", "user", "projects"]);
    const [projects, setProjects] = useState({});
    const [showProjectAdd, setShowProjectAdd] = useState(false);
    const [projectName, setProjectName] = useState("");

    useEffect(() => {
        getProjects();
    }, [projects, projectName, cookies]);

    function getProjects () {
        if(cookies?.projects) {
            setProjects(cookies.projects);
        }
    }

    function onClickLogout() {
        removeCookie("user");
    }

    function toggleProjectPopUp() {
        setShowProjectAdd(true);
    }

    const setProjectNameOnChange = event => {
        setProjectName(event.target.value);
    };

    function onClickAddProject () {
        const body = {
          username: cookies.user.username,
          jwt: cookies.jwtToken,
            projectname: projectName
        };
        postProject(body).then((response) => {
            console.log(response);
            setCookie("projects", response, { path: "/" });
            setProjects(response);
        });
    }

    return (
        <div id="main-container">
            <div id="left-panel">
                <div id="user-info">
                    <button onClick={onClickLogout}>Logout</button>
                </div>
                <div id="projects">
                    <Projects></Projects>
                    <button onClick={toggleProjectPopUp}>+</button>
                </div>
                <div id="shop">

                </div>
            </div>
            <div id="center-right-panel">
            </div>
            {showProjectAdd && <div id="project-pop-up-dimmed">
            </div>}
            {showProjectAdd &&
            <div id="project-pop-up">
                <div id="project-pop-up-form">
                    <div id="project-pop-up-form-flex">
                        <h2>Create new project</h2>
                        <form>
                            <input id="project-name" type="text" placeholder="Project name" value={projectName} onChange={setProjectNameOnChange}/>
                            <button className="project-create-button" onClick={onClickAddProject}>Create</button>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}