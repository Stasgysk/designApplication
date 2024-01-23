import './Login.css'
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { CookiesProvider, useCookies } from "react-cookie";
import {postUser} from "../api/user.service";


export default function Login(props) {
    const [, setCookie] = useCookies(["user"]);

    function onGoogleLogin(response) {
        const user = jwtDecode(response.credential);
        const cookieToStore = {
            username: user.name.toString(),
            email: user.email.toString(),
            picture: user.picture.toString()
        };
        postUser(cookieToStore).then((response) => {
            console.log(response);
        });
        setCookie("user", cookieToStore, { path: "/" });
    }

    function onGoogleLoginError() {
        console.log("Login failed!");
    }

    return (
        <CookiesProvider>
            <div id="login-container">
                <div id="login-field">
                    <div id="login-background">
                        <h1>Login</h1>
                        <div id="login-input">
                            <form>
                                <input className="login-form-input" placeholder="Username"/>
                                <input className="login-form-input" placeholder="Password"/>
                                <button type="submit" onClick={props.go}>Login</button>
                            </form>
                        </div>
                        <h3>Or <b>login</b> with</h3>
                        <div id="google-button">
                            <GoogleLogin
                                onSuccess={onGoogleLogin}
                                onError={onGoogleLoginError}
                                auto_select={true}
                                size={"large"}
                                theme={"outline"}
                            />
                        </div>
                        <h3>Or <a id="register-button">register</a></h3>
                    </div>
                </div>
            </div>
        </CookiesProvider>
    )
}