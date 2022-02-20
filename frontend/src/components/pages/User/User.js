import {Row, Col, Container, Button} from "react-bootstrap";
import axios from "axios";
import { useState, useContext } from 'react';
import { tokenContext } from "../../../App"
import { useHistory } from "react-router-dom"

const User = () => {

    const history = useHistory()

    // eslint-disable-next-line
    const [token,setToken] = useContext(tokenContext)

    const [registerForm,setRegisterForm] = useState({
        'email':'',
        'username':'',
        'phone':'',
        'password':'',
    })

    const [loginForm,setLoginForm] = useState({
        'email':'',
        'password':''
    })

    const onRegister = async () => {
        const res = await axios.post('http://localhost:8000/api/user/',registerForm)
        console.log(res)
        setRegisterForm({
            'email':'',
            'username':'',
            'phone':'',
            'password':'',
        })
    }

    const onLogin = async () => {
        const res = await axios.post('http://localhost:8000/api/user/login/',loginForm)
        if (res.data.token){
            localStorage.setItem("token",res.data.token);
        }
        history.push('/')
    }

    return (
        <Container>
            <Row className="forms">
                <Col>
                    <form className="signup-form">
                    <h2>Sign-up Form</h2>
                    <Col>
                        <Row className="signup-fields">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={registerForm.email}
                            onChange={(e) => setRegisterForm({...registerForm,'email':e.target.value})}
                            />
                        </Row>
                        <Row className="signup-fields">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={registerForm.username}
                            onChange={(e) => setRegisterForm({...registerForm,'username':e.target.value})} />
                        </Row>
                        <Row className="signup-fields">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" name="phone" value={registerForm.phone}
                            onChange={(e) => setRegisterForm({...registerForm,'phone':e.target.value})} />
                        </Row>
                        <Row className="signup-fields">
                            <label htmlFor="password">password</label>
                            <input type="password" name="password" value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm,'password':e.target.value})}/>
                        </Row>                        
                        <Row className="signup-fields">
                            <Button className="btn" onClick={onRegister}>Register</Button>
                        </Row>
                    </Col>
                    </form>
                </Col>
                <Col>
                    <form className="login-form">
                        <h2>Login Form</h2>
                        <Col>
                            <Row className="login-fields">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm,'email':e.target.value})}/>
                            </Row>
                            <Row className="login-fields">
                                <label htmlFor="password">password</label>
                                <input type="password" name="password" value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm,'password':e.target.value})}/>
                            </Row>
                            <Row>
                                <Button className="btn" onClick={onLogin} >Login</Button>
                            </Row>
                        </Col>                                            
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default User;