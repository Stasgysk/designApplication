import './Login.css'
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { CookiesProvider, useCookies } from "react-cookie";
import {getPassword, postPassword, postUser} from "../api/user.service";
import {getProjects} from "../api/project.service";
import {useEffect, useState} from "react";
import {getDefaultUserSettings} from "../objectsTemplates/UserSettings";
import { sha256 } from 'js-sha256';

export default function Login(props) {
    const [cookies, setCookie] = useCookies(["jwtToken", "user", "projects"]);
    const [isLogin, setIsLogin] = useState(true);

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
            picture: user.picture.toString(),
            user_settings: getDefaultUserSettings()
        };
        postUser(cookieToStore).then((response) => {
            setCookie("jwtToken", response.data.jwt, { path: "/" });
            const body = {
                username: cookieToStore.username,
                email: cookieToStore.email,
                jwt: response.data.jwt
            };
            console.log(response);
            getProjects(body).then((response) => {
                setCookie("projects", response.data, { path: "/" });
            });
        });
        setCookie("user", cookieToStore, { path: "/" });
    }

    function onGoogleLoginError() {
        console.log("Login failed!");
    }

    function toggleLoginRegister() {
        if(isLogin) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }

    function register(e) {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const body = {
            password: sha256(password),
            username: username,
            email: email
        }

        postPassword(body).then(response => {
            console.log(response);
            if(response.data.error) {
                return;
            }
            const cookieToStore = {
                username: username,
                email: email,
                user_settings: getDefaultUserSettings()
            };
            setCookie("jwtToken", response.data.jwt, { path: "/" });
            setCookie("user", cookieToStore, { path: "/" });
            getProjects(cookieToStore).then((response) => {
                setCookie("projects", response.data, { path: "/" });
            });
        });
    }

    function login(e) {
        e.preventDefault();
        const password = e.target[1].value;
        const firstField = e.target[0].value;
        console.log(firstField);
        if(firstField.includes("@")) {
            const passwordBody = {
                password: sha256(password),
                email: firstField
            };
            console.log(passwordBody);
            getPassword(passwordBody).then(response => {
                console.log(response);
                if(response.data.error) {
                    return;
                }
                setCookies(response.data);
            });
        } else {
            const passwordBody = {
                password: sha256(password),
                username: firstField
            };
            console.log(passwordBody);
            getPassword(passwordBody).then(response => {
                console.log(response);
                if(response.data.error) {
                    return;
                }
                setCookies(response.data);
            });
        }
    }

    function setCookies(data) {
        setCookie("jwtToken", data.jwt, { path: "/" });
        const cookieToStore = {
            username: data.username.toString(),
            email: data.email.toString(),
            user_settings: getDefaultUserSettings(),
            jwt: data.jwt
        };
        setCookie("user", cookieToStore, { path: "/" });
        getProjects(cookieToStore).then((response) => {
            setCookie("projects", response.data, { path: "/" });
        });
    }

    return (
        <CookiesProvider>
            <div id="login-container">
                <div id="login-field">
                    <div id="login-background">
                        {isLogin ? (
                            <>
                                <h1>Login</h1>
                                <div id="login-input">
                                    <form onSubmit={login}>
                                        <input
                                            className="login-form-input"
                                            placeholder="Username or email"
                                        />
                                        <input
                                            className="login-form-input"
                                            placeholder="Password"
                                        />
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
                                <h3>Or <a id="register-button" onClick={toggleLoginRegister}>register</a></h3>
                            </>
                        ) : (
                            <>
                                <h1>Register</h1>
                                <div id="login-input">
                                    <form onSubmit={register}>
                                        <input
                                            className="login-form-input"
                                            placeholder="Username"
                                        />
                                        <input
                                            className="login-form-input"
                                            placeholder="Email"
                                        />
                                        <input
                                            className="login-form-input"
                                            placeholder="Password"
                                        />
                                        <button type="submit">Register</button>
                                    </form>
                                </div>
                                <h3>Or <a id="register-button" onClick={toggleLoginRegister}>login</a></h3>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </CookiesProvider>
    )
}