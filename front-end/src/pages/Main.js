import './Main.css'
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {getProjects, postProject} from "../api/project.service";
import Projects from "../components/Projects";
import UserProfilePicture from "../components/UserProfilePicture";
import {Button, CloseButton} from 'react-bootstrap';

export default function Main(props) {
    const [cookies, setCookie , removeCookie] = useCookies(["jwtToken", "user", "projects"]);
    const [projects, setProjects] = useState({});
    const [showProjectAdd, setShowProjectAdd] = useState(false);
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);
    const [projectName, setProjectName] = useState("");

    useEffect(() => {
        getProjects();
    }, [projects, projectName, cookies, showProjectAdd]);

    function getProjects () {
        if(cookies?.projects) {
            setProjects(cookies.projects);
        }
    }

    function onClickLogout() {
        removeCookie("user");
    }

    function toggleProjectPopUpOn() {
        setShowProjectAdd(true);
    }

    function toggleProjectPopUpOff() {
        setShowProjectAdd(false);
    }

    function toggleSettingsPopUpOnOff() {
        if(showSettingsDropdown === true){
            setShowSettingsDropdown(false);
        } else {
            setShowSettingsDropdown(true);
        }
    }

    function turnSettingsPopupOn() {
        setShowSettingsPopup(true);
    }

    function turnSettingsPopupOff() {
        setShowSettingsPopup(false);
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
            var projects = cookies.projects;
            projects.push(response.data);
            setCookie("projects", projects, { path: "/" });
            setProjects(projects);
        });
        toggleProjectPopUpOff();
    }

    return (
        <div id="main-container">
            <div id="left-panel">
                <div id="user-info">
                    <div id="user-info-container">
                        <div id="user-info-user">
                            <div>
                                <a id="user-info-user-background" onClick={toggleSettingsPopUpOnOff}>
                                    {cookies.user?.picture && (
                                        <div id="user-picture-container">
                                            <UserProfilePicture url={cookies.user.picture}></UserProfilePicture>
                                        </div>
                                    )}
                                    {cookies.user?.username && (
                                        <h3>{cookies.user.username}</h3>
                                    )}
                                    <div id="arrow-down">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                             className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>
                                    </div>
                                </a>
                                {showSettingsDropdown && <div id="settings-popup">
                                    <Button id="settings-button" variant="outline-secondary" onClick={turnSettingsPopupOn}>Settings</Button>
                                    <Button variant="secondary" onClick={onClickLogout}>Logout</Button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="projects">
                    <h5>Projects</h5>
                    <Projects setCurrProject={props.setCurrProject}></Projects>
                    <div id="add-project-button-container">
                        <Button variant="secondary" size="sm" onClick={toggleProjectPopUpOn}>Add project </Button>
                    </div>
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
                        <div id="create-close-project">
                            <h3>Create new project</h3>
                            <div>
                                <CloseButton onClick={toggleProjectPopUpOff}/>
                            </div>
                        </div>
                        <form>
                            <input id="project-name" type="text" placeholder="Project name" value={projectName} onChange={setProjectNameOnChange}/>
                            <div className="button-container">
                                <Button className="project-create-button" onClick={onClickAddProject} variant="secondary">Create</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
            {showSettingsPopup && <div id="project-pop-up-dimmed">
            </div>}
            {showSettingsPopup &&
                <div id="project-pop-up">
                    <div id="project-pop-up-form">
                        <div id="project-pop-up-form-flex">
                            <div id="create-close-project">
                                <div>
                                    <CloseButton onClick={turnSettingsPopupOff}/>
                                </div>
                            </div>
                            {cookies.user?.picture && (
                                <div id="user-picture-container">
                                    <UserProfilePicture url={cookies.user.picture}></UserProfilePicture>
                                </div>
                            )}
                            {cookies.user?.username && (
                                <h3>{cookies.user.username}</h3>
                            )}
                            {cookies.user?.email && (
                                <h5>{cookies.user.email}</h5>
                            )}
                            {/*<form>*/}
                            {/*    <input id="project-name" type="text" placeholder="Project name" value={projectName} onChange={setProjectNameOnChange}/>*/}
                            {/*    <div className="button-container">*/}
                            {/*        <Button className="project-create-button" onClick={onClickAddProject} variant="secondary">Create</Button>*/}
                            {/*    </div>*/}
                            {/*</form>*/}
                        </div>
                    </div>
                </div>}
        </div>
    )
}