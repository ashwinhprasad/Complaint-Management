import { useHistory } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { tokenContext } from "../../../App"
import {Button, Row, Col } from "react-bootstrap"
import axios from "axios"
import Select from "react-select";

const Home = () => {

    const history = useHistory()
    const [token,setToken] = useContext(tokenContext)
    const [complaint,setComplaint] = useState({
        'title':'',
        'photo':'',
        'is_mask_helmet':'mask'
    })

    const onComplaintPost = async (e) => {
        const data = new FormData()
        data.append('title',complaint.title)
        data.append('photo',complaint.photo)
        data.append('is_mask_helmet',complaint.is_mask_helmet)
        const res = await axios.post('http://localhost:8000/api/complaint/',data,{
            'headers':{
                'Authorization': `Token ${token}` 
            } 
        })
        console.log(res)
        setComplaint({
            'title':'',
            'photo':'',
            'is_mask_helmet':'mask'
        })
    }
    
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
                <input type="text" name="title" placeholder="Complaint Title" 
                value={complaint.title}
                onChange={(e) => setComplaint({...complaint,'title':e.target.value})} 
                />
                <br/>
                <Select options={[
                    { value: 'mask', label: 'Mask'},
                    { value: 'helmet', label: 'Helmet'}
                ]}
                onChange={(e) => {
                    setComplaint({
                        ...complaint,
                        'is_mask_helmet':e.value
                    })
                }}
                />
                <input type="file"  name="proof"
                onChange={(e) => setComplaint({...complaint,'photo':e.target.files[0]})}  
                />
                <Row>
                    <Col>
                        <Button variant="success" onClick={onComplaintPost} >Post</Button>
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
