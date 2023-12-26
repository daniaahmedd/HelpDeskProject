import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

export default function UpdateProfile() {
    const {state} = useLocation();
    // const [cookies, removeCookies] = useCookies([]);
    const navigate = useNavigate();
    // const [cookies, removeCookies] = useCookies([]);
    const [userNamein, setUserNameIn] = useState('');
    const [firstNamein, setFirstNameIn] = useState('');
    const [lastNamein, setLastNameIn] = useState('');
    const [emailin, setEmailIn] = useState('');
    const [passwordin, setPasswordIn] = useState('');
    const [userTypein, setUserTypeIn] = useState('User');

    if(state){
        console.log(state)
        var { id, userName, userType, token } = state;
    }

    const SignupSchema = Yup.object().shape({
        password: Yup.string()
          .min(7, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      });

    async function handleRegister() {
        // console.log("cookies", cookies);
        // if (!cookies.token) {
        //   navigate("/login");
        // }
        console.log(userNamein)
        console.log(firstNamein)
        console.log(lastNamein)
        console.log(emailin)
        console.log(passwordin)
        console.log(userTypein)
        const response = await axios.post('http://localhost:3000/api/users/', {
            userName: userNamein,
            firstName:firstNamein,
            lastName:lastNamein,
            email:emailin,
            password:passwordin,
            userType:userTypein
        },
        {
            withCredentials: true 
        });

        console.log(response.data);
        if(response.status == 200){
            localStorage.setItem("userId",id);
            localStorage.setItem("userName",userNamein);
            localStorage.setItem("userType",userType);
            localStorage.setItem("token",token);
            console.log(response)
        }
    }

    return (
        <>
          <div>
            <Navbar />
            <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
            >
            {({ errors, touched }) => (
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value={userNamein}
                                onChange={(e) => setUserNameIn(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={firstNamein}
                                onChange={(e) => setFirstNameIn(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={lastNamein}
                                onChange={(e) => setLastNameIn(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={emailin}
                                onChange={(e) => setEmailIn(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="please enter minimum of 8 characters" value={passwordin}
                                onChange={(e) => setPasswordIn(e.target.value)}/>
                    {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                    ) : null}
                    <Button type="button" variant="primary" onClick={handleRegister}>
                        Register
                    </Button>{' '}
                </Form.Group>
            </Form>
            )}
            </Formik>
          </div>
        </>
    );

}