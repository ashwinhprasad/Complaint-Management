import { useHistory } from "react-router-dom"
import { useEffect, useContext } from "react"
import { tokenContext } from "../../../App"
import {Button, Row, Col } from "react-bootstrap"

const Home = () => {

    const history = useHistory()
    const [token,setToken] = useContext(tokenContext)

    useEffect(() => {
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
    } else {
        history.push("/usr")
    }
    // eslint-disable-next-line
    },[token])

    return (
        <div>
            <form className="complaint-form">
                <h2>File Complaint</h2>
                <input type="text" name="title" placeholder="Complaint Title"/>
                <input type="file" name="proof" />
                <Row>
                    <Col>
                        <Button variant="success" >Post</Button>
                    </Col>
                    <Col>
                        <Button variant='danger'>Logout</Button>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default Home;
