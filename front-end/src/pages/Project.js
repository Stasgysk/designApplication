import './Project.css';
import './Main.css';
import {useEffect, useRef, useState} from "react";
import FileDropDown from "../components/UpperDropDown/FileDropDown";
import EditDropDown from "../components/UpperDropDown/EditDropDown";
import ImageDropDown from "../components/UpperDropDown/ImageDropDown";
import WindowDropDown from "../components/UpperDropDown/WindowDropDown";
import HelpDropDown from "../components/UpperDropDown/HelpDropDown";
import {Button, CloseButton} from "react-bootstrap";
import CanvasImage from "../components/CanvasImage";

export default function Project (props) {
    const [currProject, setCurrProject] = useState(null);
    const [isFileDropDown, setIsFileDropDown] = useState(false);
    const [isEditDropDown, setIsEditDropDown] = useState(false);
    const [isImageDropDown, setIsImageDropDown] = useState(false);
    const [isWindowDropDown, setIsWindowDropDown] = useState(false);
    const [isHelpDropDown, setIsHelpDropDown] = useState(false);
    const [showFilePopUp, setShowFilePopUp] = useState(false);
    const inputFile = useRef(null);
    const [file, setFile] = useState([]);
    const [imagesCount, setImagesCount] = useState(0);

    const onFileChange = (event) => {
        if(event.target.files.length > 0) {
            setFile(file => [...file, event.target.files[0]]);
            setImagesCount(imagesCount + 1);
            setShowFilePopUp(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
        showImportedFile();
    }, [currProject, file]);

    function showImportedFile() {
        if(file !== null && file !== undefined) {
            //console.log(file.name);
        }
    }

    function onClickProject() {
        setCurrProject(null);
        props.setCurrProject(currProject);
    }

    function hideFilePopUp(){
        setShowFilePopUp(false);
    }

    function handleFileOpen() {
        setShowFilePopUp(true);
    }

    function onClickOpen() {
        inputFile.current.click();
    }

    function triggerFileDropDown(){
        if (isFileDropDown === true) {
            setIsFileDropDown(false);
        } else {
            setIsFileDropDown(true);
        }
    }

    function triggerEditDropDown(){
        if (isEditDropDown === true) {
            setIsEditDropDown(false);
        } else {
            setIsEditDropDown(true);
        }
    }

    function triggerImageDropDown(){
        if (isImageDropDown === true) {
            setIsImageDropDown(false);
        } else {
            setIsImageDropDown(true);
        }
    }

    function triggerWindowDropDown(){
        if (isWindowDropDown === true) {
            setIsWindowDropDown(false);
        } else {
            setIsWindowDropDown(true);
        }
    }

    function triggerHelpDropDown(){
        if (isHelpDropDown === true) {
            setIsHelpDropDown(false);
        } else {
            setIsHelpDropDown(true);
        }
    }

    return (
        <div id="main-project-container">
            <div id="main-project-container-background">
                <div id="project-content">
                    <div id="upper-project-menu">
                        <div className="menu" onMouseEnter={triggerFileDropDown} onMouseLeave={triggerFileDropDown}>
                            <button type="button" className="upper-menu-button">File</button>
                            {isFileDropDown && <FileDropDown leave={onClickProject} openFile={handleFileOpen}/>}
                        </div>
                        <div className="menu" onMouseEnter={triggerEditDropDown} onMouseLeave={triggerEditDropDown}>
                            <button type="button" className="upper-menu-button">Edit</button>
                            {isEditDropDown && <EditDropDown leave={onClickProject}/>}
                        </div>
                        <div className="menu" onMouseEnter={triggerImageDropDown} onMouseLeave={triggerImageDropDown}>
                            <button type="button" className="upper-menu-button">Image</button>
                            {isImageDropDown && <ImageDropDown leave={onClickProject}/>}
                        </div>
                        <div className="menu" onMouseEnter={triggerWindowDropDown} onMouseLeave={triggerWindowDropDown}>
                            <button type="button" className="upper-menu-button">Window</button>
                            {isWindowDropDown && <WindowDropDown leave={onClickProject}/>}
                        </div>
                        <div className="menu" onMouseEnter={triggerHelpDropDown} onMouseLeave={triggerHelpDropDown}>
                            <button type="button" className="upper-menu-button">Help</button>
                            {isHelpDropDown && <HelpDropDown leave={onClickProject}/>}
                        </div>
                        <button type="button" className="upper-menu-button">+</button>
                    </div>
                    <div id="under-project-menu">
                        <div id="left-project-menu">
                            <button type="button" className="left-menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-hand-index" viewBox="0 0 16 16">
                                    <path
                                        d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 1 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 0 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.035a.5.5 0 0 1-.416-.223l-1.433-2.15a1.5 1.5 0 0 1-.243-.666l-.345-3.105a.5.5 0 0 1 .399-.546L5 8.11V9a.5.5 0 0 0 1 0V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025"/>
                                </svg>
                            </button>
                            <button type="button" className="left-menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-brush" viewBox="0 0 16 16">
                                    <path
                                        d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                                </svg>
                            </button>
                            <button type="button" className="left-menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-crop" viewBox="0 0 16 16">
                                    <path
                                        d="M3.5.5A.5.5 0 0 1 4 1v13h13a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2H3.5a.5.5 0 0 1-.5-.5V4H1a.5.5 0 0 1 0-1h2V1a.5.5 0 0 1 .5-.5zm2.5 3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4H6.5a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </button>
                            <button type="button" className="left-menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-eyedropper" viewBox="0 0 16 16">
                                    <path
                                        d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"/>
                                </svg>
                            </button>
                            <button type="button" className="left-menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-paint-bucket" viewBox="0 0 16 16">
                                    <path
                                        d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a2.972 2.972 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1.01 1.01 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4.322 4.322 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067-.707-.707-1.441-1.279-2.068-1.627-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219l-.217.216zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.283 3.283 0 0 1-.131-.673c.091.061.204.15.337.274zm.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088c.054.12.115.243.183.365.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626.122.068.244.13.365.183l-4.861 4.862a.571.571 0 0 1-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46-.66-.66-1.168-1.32-1.46-1.846-.147-.265-.225-.47-.251-.607a.573.573 0 0 1-.01-.068l3.048-3.047zm2.87-1.935a2.44 2.44 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.497 3.497 0 0 0-1.066.091 11.27 11.27 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"/>
                                </svg>
                            </button>
                            <button type="button" className="left-menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-pen" viewBox="0 0 16 16">
                                    <path
                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                </svg>
                            </button>
                        </div>
                        <div id="main-project-menu">
                            <div id="project-canvas">
                                <div id="canvas">
                                    {file && file.map(item => (
                                        <CanvasImage id={imagesCount} key={URL.createObjectURL(item)} src={URL.createObjectURL(item)} alt={item}/>
                                    ))}
                                </div>
                            </div>
                            <div id="project-right-options">

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {showFilePopUp && <div id="project-pop-up-dimmed">
            </div>}
            {showFilePopUp &&
                <div id="project-pop-up">
                    <div id="project-pop-up-form">
                        <div id="project-pop-up-form-flex">
                            <div id="create-close-project">
                                <h3>Create new project</h3>
                                <div>
                                    <CloseButton onClick={hideFilePopUp}/>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input id="file" type="file" ref={inputFile} style={{display: 'none'}} onChange={onFileChange}/>
                                <div className="button-container">
                                    <Button className="project-create-button" variant="secondary" onClick={onClickOpen}>Open</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
        </div>
    )
}