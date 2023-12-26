import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';


export default function User({user}) {
    const {state} = useLocation();
    // const [cookies, removeCookies] = useCookies([]);
    const navigate = useNavigate();
    const [uid, setUID] = useState(user._id);
    const [uName, setUName] = useState(user.UserName);
    const [uFirstName, setUFirstName] = useState(user.firstName);
    const [uLastName, setULastName] = useState(user.lastName);
    const [uType, setUType] = useState(user.userType);
    const [uEmail, setUEmail] = useState(user.email);
    const [uPass, setUPass] = useState(user.password);

    if(state){
        console.log(state)
        var { id, userName, userType, token, users } = state;
    }

    async function handleAssignUser(){
        console.log('emailInput =>', uEmail)
        const response = await axios.put(`http://localhost:3000/api/users/assign`, {
            email: uEmail,
            userType: 'User'
        },
        {
            withCredentials: true 
        });
        console.log(response.data);
        if(response.status == 200){
            // const updatedUserId = response.data.user._id;
            // const isUpdatedElement = (element) => element._id == updatedUserId;
            // const updateUserIndex = users.findIndex(isUpdatedElement);
            // var updateElement = users[updateUserIndex];
            // users[updateUserIndex] = response.data.user
            const response = await axios.get(`http://localhost:3000/api/users/getUsers`, {
                withCredentials: true 
            });
            console.log('handleAssignRole', response.data);
            if(response.status == 200){
                navigate("/assignRole", { state: { id: id, 
                userName: userName, 
                userType:  userType,
                token: token, 
                users: response.data
            } });
            }
            console.log('res data = >', response.data.user)
            console.log('USERS=>', users)
        }
    }

    async function handleAssignManager(){
        console.log('uEmail', uEmail);
        const response = await axios.put(`http://localhost:3000/api/users/assign`, {
            email: uEmail,
            userType: 'Manager'
        },
        {
            withCredentials: true 
        });
        console.log(response.data);
        if(response.status == 200){
            const response = await axios.get(`http://localhost:3000/api/users/getUsers`, {
                withCredentials: true 
            });
            console.log('handleAssignRole', response.data);
            if(response.status == 200){
                navigate("/assignRole", { state: { id: id, 
                userName: userName, 
                userType:  userType,
                token: token, 
                users: response.data
            } });
            }
            console.log('res data = >', response.data.user)
            console.log('USERS=>', users)
        }
    }

    async function handleAssignAdmin(){
        const response = await axios.put(`http://localhost:3000/api/users/assign`, {
            email: uEmail,
            userType: 'Admin'
        },
        {
            withCredentials: true 
        });
        if(response.status == 200){
            const response = await axios.get(`http://localhost:3000/api/users/getUsers`, {
                withCredentials: true 
            });
            console.log('handleAssignRole', response.data);
            if(response.status == 200){
                navigate("/assignRole", { state: { id: id, 
                userName: userName, 
                userType:  userType,
                token: token, 
                users: response.data
            } });
            }
            console.log('res data = >', response.data.user)
            console.log('USERS=>', users)
        }
    }

    async function handleAssignAgent(){
        const response = await axios.put(`http://localhost:3000/api/users/assign`, {
            email: uEmail,
            userType: 'Agent'
        },
        {
            withCredentials: true 
        });
        if(response.status == 200){
            const response = await axios.get(`http://localhost:3000/api/users/getUsers`, {
                withCredentials: true 
            });
            console.log('handleAssignRole', response.data);
            if(response.status == 200){
                navigate("/assignRole", { state: { id: id, 
                userName: userName, 
                userType:  userType,
                token: token, 
                users: response.data
            } });
            }
            console.log('res data = >', response.data.user)
            console.log('USERS=>', users)
        }
    }

    // useEffect(() => {
    //     async function update(){
    //         try {
    //         user = users
    //         }catch (error) {
    //             console.log("error");
    //             console.log(error);
    //           }
    //     }
    //     update()
    // }, [users])
    

    return (
        <>
            <tbody>
                <tr>
                    <td value={uid}
                        onChange={(e) => setUID(e.target.value)}>{user._id}</td>
                    <td value={uName}
                        onChange={(e) => setUName(e.target.value)}>{user.UserName}</td>
                    <td value={uFirstName}
                        onChange={(e) => setUFirstName(e.target.value)}>{user.firstName}</td>
                    <td value={uLastName}
                        onChange={(e) => setULastName(e.target.value)}>{user.lastName}</td>
                    <td value={uType}
                        onChange={(e) => setUType(e.target.value)}>{user.userType}</td>
                    <td value={uEmail}
                        onChange={(e) => setUEmail(e.target.value)}>{user.email}</td>
                    <td value={uPass}
                        onChange={(e) => setUPass(e.target.value)}>{user.password}</td>
                    <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Assign Role
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item type="button" onClick={handleAssignUser}>User</Dropdown.Item>
                            <Dropdown.Item type="button" onClick={handleAssignManager}>Manager</Dropdown.Item>
                            <Dropdown.Item type="button" onClick={handleAssignAdmin}>Admin</Dropdown.Item>
                            <Dropdown.Item type="button" onClick={handleAssignAgent}>Agent</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </td>
                    
                </tr>
            </tbody>
            
        </>
    );

}