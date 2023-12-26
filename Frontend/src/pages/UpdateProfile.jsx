import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateProfile() {
    const {state} = useLocation();
    // const [cookies, removeCookies] = useCookies([]);
    const navigate = useNavigate();
    const [emailin, setEmailIn] = useState('');
    const [passwordin, setPasswordIn] = useState('');
    const [userNamein, setUserNameIn] = useState('');


    if(state){
        console.log(state)
        var { id, userName, userType, token } = state;
    }

    async function handleUpdateProf() {
      try {
        //   console.log('cookies', cookies)
        //   if (!Cookies.token) {
        //     navigate("/login");
        //   }
          const response = await axios.put('http://localhost:3000/api/users/profile', {
            userid: id,
            email: emailin, 
            password: passwordin,
            userName: userNamein
          }, {
          withCredentials: true 
          });
          console.log(response.data);
          if(response.status == 200){
            localStorage.setItem("userId",id);
            if(!userNamein.length === 0){
            localStorage.setItem("userName",userNamein);
            userName = userNamein;
            }
            localStorage.setItem("userType",userType);
            localStorage.setItem("token",token);
            console.log(response)
        }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
          <div>
            <Navbar />
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value={userNamein}
                                onChange={(e) => setUserNameIn(e.target.value)}/>
                </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={emailin}
                            onChange={(e) => setEmailIn(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={passwordin}
                            onChange={(e) => setPasswordIn(e.target.value)}/>
                <Button type="button" variant="primary" onClick={handleUpdateProf}>
                    Update
                </Button>{' '}
            </Form.Group>
            </Form>
          </div>
        </>
    );

}