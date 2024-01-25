import './Login.css'
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { CookiesProvider, useCookies } from "react-cookie";
import {postUser} from "../api/user.service";
import {getProjects} from "../api/project.service";
import {useEffect} from "react";


export default function Login(props) {
    const [cookies, setCookie] = useCookies(["jwtToken", "user", "projects"]);

    useEffect(() => {
        if(cookies?.user) {
            const body = {
                username: cookies.user.username.toString(),
                email: cookies.user.email.toString(),
                picture: cookies.user.picture.toString(),
                jwt: cookies.jwtToken
            };
            getProjects(body).then((response) => {
                setCookie("projects", response.data, { path: "/" });
            });
        }
    }, [cookies]);

    function onGoogleLogin(response) {
        const user = jwtDecode(response.credential);
        const cookieToStore = {
            username: user.name.toString(),
            email: user.email.toString(),
            picture: user.picture.toString()
        };
        postUser(cookieToStore).then((response) => {
            setCookie("jwtToken", response.data.jwt, { path: "/" });
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