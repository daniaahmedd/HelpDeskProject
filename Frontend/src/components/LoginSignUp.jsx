import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';



const LoginSignUp = (props) => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPass, setInputPass] = useState('');


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                email: inputEmail,
                password: inputPass
            });
            console.log(response.data);
            
        } catch (error) {
            console.log(error);
            // Handle login error - show error message, etc.
        }
    };

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ background: '#000000ad' }}
            >
                <Modal.Header closeButton style={{ color: '#adb5bd', background: '#212529' }}>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ color: '#adb5bd' }}>
                        Please Sign In or Log In To Continue
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: '#adb5bd', background: '#212529' }}>
                    <form className="form col-md-12 center-block" onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control input-lg"
                                placeholder="Email"
                                style={{ marginTop: '10px', marginBottom: '10px' }}
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control input-lg"
                                placeholder="Password"
                                style={{ marginTop: '10px', marginBottom: '10px' }}
                                value={inputPass}
                                onChange={(e) => setInputPass(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-md btn-block">Log In</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{ color: '#adb5bd', background: '#212529' }}>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginSignUp;