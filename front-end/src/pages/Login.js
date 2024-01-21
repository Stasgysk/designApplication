import './Login.css'
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { CookiesProvider, useCookies } from "react-cookie";


export default function Login(props) {
    const [, setCookie] = useCookies(["user"]);

    function onGoogleLogin(response) {
        const user = jwtDecode(response.credential);
        const cookieToStore = {
            username: user.name,
            email: user.email,
            picture: user.picture
        };
        setCookie("user", cookieToStore, { path: "/" });
    }

    function onGoogleLoginError() {
        console.log("Login failed!");
    }

    return (
        <CookiesProvider>
            <div className="login-field">
                <h1>Login</h1>
                <div id="login-input">
                    <form>
                        <input className="login-form-input" placeholder="Username"/><br/>
                        <input className="login-form-input" placeholder="Password"/><br/>
                        <button type="submit" onClick={props.go}>Login</button>
                    </form>
                </div>
                <h3>Or <b>login</b> with</h3>
                <div id="google-button">
                    <GoogleLogin
                        onSuccess={onGoogleLogin}
                        onError={onGoogleLoginError}
                        auto_select={true}
                    />
                </div>
                <h3>Or <a id="register-button">register</a></h3>
            </div>
        </CookiesProvider>
    )
}