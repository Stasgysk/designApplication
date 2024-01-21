import './Main.css'
import {useCookies} from "react-cookie";


export default function Main() {
    const [, , removeCookie] = useCookies(["user"]);

    function onClickLogout() {
        removeCookie("user");
    }

    return (
        <div>
            <h1>ssdsadas</h1>
            <button onClick={onClickLogout}>Logout</button>
        </div>
    )
}