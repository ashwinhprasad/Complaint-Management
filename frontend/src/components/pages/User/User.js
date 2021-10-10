import {Row, Col, Container, Button} from "react-bootstrap"

const User = () => {
    return (
        <Container>
            <Row className="forms">
                <Col>
                    <form className="signup-form">
                    <h2>Sign-up Form</h2>
                    <Col>
                        <Row className="signup-fields">
                            <label for="email">Email</label>
                            <input type="text" name="email" />
                        </Row>
                        <Row className="signup-fields">
                            <label for="username">Username</label>
                            <input type="text" name="username" />
                        </Row>
                        <Row className="signup-fields">
                            <label for="phone">Phone</label>
                            <input type="text" name="phone" />
                        </Row>
                        <Row className="signup-fields">
                            <label for="password">password</label>
                            <input type="password" name="password" />
                        </Row>                        
                        <Row className="signup-fields">
                            <Button className="btn">Register</Button>
                        </Row>
                    </Col>
                    </form>
                </Col>
                <Col>
                    <form className="login-form">
                        <h2>Login Form</h2>
                        <Col>
                            <Row className="login-fields">
                                <label for="email">Email</label>
                                <input type="text" name="email" />
                            </Row>
                            <Row className="login-fields">
                                <label for="password">password</label>
                                <input type="password" name="password" />
                            </Row>

                            <Row>
                                <Button className="btn">Login</Button>
                            </Row>
                        </Col>                                            
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default User;