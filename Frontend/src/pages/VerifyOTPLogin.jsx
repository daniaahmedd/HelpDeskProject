import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const VerifyOTPLogin = () => {
    const [OTP, setOTP] = useState('');
    const navigate = useNavigate();

    const handleVerifyOTP = async (event) => {
        event.preventDefault();
        try {
            console.log(OTP);
            const searchParams = new URLSearchParams(window.location.search);
            const emailQuery = searchParams.get('email');
            const otpQuery = searchParams.get('otp');
            const passQuery = searchParams.get('password');
            const skQuery = searchParams.get('secretkey');
            const response = await axios.post(`http://localhost:3000/api/auth/verifyOTPLogin?email=${emailQuery}&otp=${otpQuery}&password=${passQuery}&secretkey=${skQuery}`, {
                inputOTP: OTP
            }, 
            {withCredentials: true});
            console.log(response.data);
            if(response.status == 200){
                localStorage.setItem("userId",response.data.actualUser._id);
                localStorage.setItem("userName",response.data.actualUser.UserName);
                localStorage.setItem("userType",response.data.actualUser.userType);
                localStorage.setItem("token",response.data.token);
                console.log(response)
                console.log(response.data.token)
                setTimeout(() => {
                    navigate("/", { state: { id: response.data.actualUser[0]._id, 
                        userName: response.data.actualUser[0].UserName, 
                        userType:  response.data.actualUser[0].userType,
                        token: response.data.token
                    } });
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <>
            <div>
                <Navbar />
                <Form onSubmit={handleVerifyOTP}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter the OTP received in your email</Form.Label>
                        <Form.Control
                            type="number"
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                        />
                        <Button type="submit" variant="primary">
                            Verify Login OTP
                        </Button>{' '}
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default VerifyOTPLogin;