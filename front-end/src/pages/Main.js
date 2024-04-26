import './Main.css'
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {postProject} from "../api/project.service";
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
    const [crop, setCrop] = useState();
    const [isShop, setIsShop] = useState(false);


    useEffect(() => {
        const user_settings = cookies.user.user_settings;
        user_settings.map(setting => {
            if(setting.hasOwnProperty('crop')) {
                setCrop(setting.crop);
            }
        })
        getProjects();
    }, [projects, projectName, cookies, showProjectAdd]);

    function getProjects () {
        if(cookies?.projects) {
            setProjects(cookies.projects);
        }
    }

    function onClickLogout() {
        removeCookie("user");
        removeCookie("jwtToken");
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
            console.log(response.data);
            let projectsCookies = cookies.projects;
            if(!projectsCookies) {
                projectsCookies = [];
            }
            console.log(projectsCookies);
            projectsCookies.push(response.data);
            setCookie("projects", projectsCookies, { path: "/" });
            setProjects(projectsCookies);
        });
        toggleProjectPopUpOff();
    }

    function toggleComponents(e) {
        const value = e.currentTarget.id;
        console.log(value);
        let user_settings = cookies.user.user_settings;
        switch (value) {
            case "crop-button":
                user_settings.map(setting => {
                    if(setting.hasOwnProperty('crop')) {
                        setCrop(setting.crop);
                        setting.crop = setting.crop !== true;
                    }
                })
        }
        console.log(user_settings);
        cookies.user.user_settings = user_settings;
        setCookie("user", cookies.user, { path: "/" });
    }

    function toggleShop(e) {
        const button = document.getElementById("component-shop-button");
        console.log(e.target);
        if(isShop === false) {
            setIsShop(true);
            button.className = "active";
        } else {
            setIsShop(false);
            button.className = "";
        }
    }

    return (
        <div id="main-container">
            <div id="left-panel">
                <div id="user-info">
                    <div id="user-info-container">
                        <div id="user-info-user">
                            <div>
                                <div onClick={toggleSettingsPopUpOnOff} onMouseLeave={toggleSettingsPopUpOnOff}>
                                    <div id="user-info-user-background">
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
                                    </div>
                                    {showSettingsDropdown && <div id="settings-popup">
                                        <Button id="settings-button" variant="outline-secondary" onClick={turnSettingsPopupOn}>Settings</Button>
                                        <Button variant="secondary" onClick={onClickLogout}>Logout</Button>
                                    </div>}
                                </div>
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
                <div id="other-field">
                    <h5>Other</h5>
                    <div id="component-shop-button" onClick={toggleShop}>
                        <div style={{width: '24px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </div>
                        <h6>Component Shop</h6>
                    </div>
                </div>
            </div>
            <div id="center-right-panel">
                <div id="upper-center-title">
                    <div id="component-shop-field">
                        <div id="component-stop-text-area">
                            {isShop ? (
                                <>
                                    <h1 style={{fontSize:'40px'}}>Component Shop</h1>
                                    <h6>Add any component to your environment setup with just one click!</h6>
                                </>
                            ) : (
                                <>
                                    <h1 style={{fontSize:'40px'}}>Welcome to designe application!</h1>
                                </>
                            )}
                        </div>
                        <div id="component-stop-img-area">
                            <div id="component-shop-icon-background">
                                <svg xmlns="http://www.w3.org/2000/svg" width="99" height="99" className="bi bi-postcard-heart" id="component-shop-icon" viewBox="0 0 16 16">
                                    <path d="M8 4.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zm3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622M2.5 5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
                                    <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="components-column">
                    {isShop &&
                        <>
                            <div className="components-row">
                                <div className="component">
                                    <div className="component-background">
                                        <div className="component-img">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-crop" viewBox="0 0 16 16">
                                                <path className="bi-inner" d="M3.5.5A.5.5 0 0 1 4 1v13h13a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2H3.5a.5.5 0 0 1-.5-.5V4H1a.5.5 0 0 1 0-1h2V1a.5.5 0 0 1 .5-.5m2.5 3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4H6.5a.5.5 0 0 1-.5-.5"/>
                                            </svg>
                                        </div>
                                        <div className="component-text">
                                            <h6>Crop function</h6>
                                            <div className="component-button">
                                                {crop ? (
                                                    <Button variant="secondary" size="sm" id="crop-button" onClick={toggleComponents}>Remove</Button>
                                                ) : (
                                                    <Button variant="secondary" size="sm" id="crop-button" onClick={toggleComponents}>Add</Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="component"></div>
                                <div className="component"></div>
                                <div className="component"></div>
                                <div className="component"></div>
                                <div className="component"></div>
                                <div className="component"></div>
                            </div>
                            <div className="components-row">

                            </div>
                            <div className="components-row">

                            </div>
                        </>
                    }
                </div>
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