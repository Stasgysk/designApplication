import './Main.css'
import {useCookies} from "react-cookie";


export default function Main() {
    const [, , removeCookie] = useCookies(["user"]);

    function onClickLogout() {
        removeCookie("user");
    }

    return (
        <div id="main-container">
            <div id="left-panel">
                <div id="user-info">
                    <button onClick={onClickLogout}>Logout</button>
                </div>
                <div id="projects">

                </div>
                <div id="shop">

                </div>
            </div>
            <div id="center-right-panel">
            </div>
        </div>
    )
}