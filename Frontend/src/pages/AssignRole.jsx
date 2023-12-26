import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import User from '../components/User';
import Table from 'react-bootstrap/Table';


export default function AssignRole() {
    const {state} = useLocation();
    // const [cookies, removeCookies] = useCookies([]);
    const navigate = useNavigate();
    if(state){
        console.log(state)
        var { id, userName, userType, token, users } = state;
        console.log('resData =>', users)
    }
    
    useEffect(() => {
        async function fetchData() {
            console.log('AGAIN')
           const response = await axios.get(`http://localhost:3000/api/users/getUsers`, {
              withCredentials: true 
          });
          if(response.status == 200){
              users = response.data.users
              console.log('res data = >', response.data)
              console.log(users)
          }
        }
    fetchData();
    }, []);

    return (
        <>
          <div>
            <Navbar />
            <ul>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>UserName</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>UserType</th>
                    <th>Email</th>
                    <th>Password</th>
                    </tr>
                </thead>
                {users.map((user) => (
                    <User user={user} key={user._id}/>
                ))}
            </Table>
            </ul>
          </div>
        </>
    );

}