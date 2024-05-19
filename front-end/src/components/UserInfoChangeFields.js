import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {changePassword, changeUserInfo} from "../api/user.service";
import {useCookies} from "react-cookie";

export default function UserInfoChangeFields(props) {
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [email, setEmail] = useState(props.cookies.user.email);
    const [userName, setUserName] = useState(props.cookies.user.username);
    const [cookies, setCookie , removeCookie] = useCookies(["jwtToken", "user"]);

    function changePasswordAndSendRequest(e) {
        e.preventDefault()
        console.log(password1);
        console.log(password2);
        if(password1 === password2) {
            const body = {
                password: password1,
                userName: props.cookies.user.userName,
                email: props.cookies.user.email
            }
            changePassword(body).then(response => {
                console.log(response);
            });
            alert("Password changed");
        } else {
            alert("Passwords doesn't match!");
        }
    }

    function changeUserInfoAndSendRequest(e) {
        e.preventDefault();
        if(email === "" || userName === "") {
            alert("Field's are empty!");
            return;
        }
        const body = {
            oldEmail: props.cookies.user.email,
            oldUserName: props.cookies.user.username,
            email: email,
            userName: userName
        }
        changeUserInfo(body).then(response => {
            console.log(response);
            setCookie("jwtToken", response.data.jwt, { path: "/" });
            const cookieToStore = {
                username: userName,
                email: email,
                user_settings: cookies.user.user_settings,
                isGoogleLogin: false
            };
            setCookie("user", cookieToStore, { path: "/" });
        })
    }

    const onChangeSetPassword1 = event => {
        setPassword1(event.target.value);
    };

    const onChangeSetPassword2 = event => {
        setPassword2(event.target.value);
    };

    const onChangeSetEmail = event => {
        setEmail(event.target.value);
    };

    const onChangeSetUserName = event => {
        setUserName(event.target.value);
    };

    return (
        <>
            {!props.cookies.user.isGoogleLogin && (
                <div className="user-form-field">
                    <Form className="user-form">
                        <Form.Group className="mb-3 password-change-form">
                            <Form.Control className="password-input" id="password-change-1" type="password" placeholder="Password" onChange={onChangeSetPassword1} required/>
                            <Form.Control className="password-input" id="password-change-2" type="password" placeholder="Repeat password" onChange={onChangeSetPassword2} required/>
                        </Form.Group>
                        <Form.Group className="mb-3 password-change-form password-change-button">
                            <Button  variant="secondary" onClick={changePasswordAndSendRequest}>Change</Button>
                        </Form.Group>
                    </Form>
                </div>
            )}
            {!props.cookies.user.isGoogleLogin && (
                <div className="user-form-field">
                    <Form className="user-form">
                        <Form.Group className="mb-3 password-change-form">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className="password-input" id="email-change" type="text" value={email} placeholder="Email" onChange={onChangeSetEmail}/>
                            <Form.Label>Username</Form.Label>
                            <Form.Control className="password-input" id="username-change" type="text" value={userName} placeholder="Username" onChange={onChangeSetUserName}/>
                        </Form.Group>
                        <Form.Group className="mb-3 password-change-form password-change-button">
                            <Button  variant="secondary" onClick={changeUserInfoAndSendRequest}>Change</Button>
                        </Form.Group>
                    </Form>
                </div>
            )}
        </>
    )
}