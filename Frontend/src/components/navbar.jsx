import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const {state} = useLocation();
  const [cookies, removeCookies] = useCookies([]);
  const navigate = useNavigate();

  if(state){
    console.log(state)
    var { id, userName, userType, token } = state;
  }
    async function handleLogout() {
      try {
          console.log('cookies', cookies)
          if (!cookies.token) {
            navigate("/login");
          }
          // const token = localStorage.getItem("token");
          const response = await axios.delete(`http://localhost:3000/api/users/logout`, {
          withCredentials: true 
          });
          console.log(response.data);
          if(response.status == 200){
            removeCookies(cookies.token)
            navigate("/login");
          }
          
      } catch (error) {
          console.log(error);
      }
    };

    async function handleNavUpdate(){
      navigate("/updateProfile", { state: { id: id, 
        userName: userName, 
        userType:  userType,
        token: token
    } });
    }

    async function handleAssignRole(){
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
      
    }

   
    async function handleRegister(){
      navigate("/register", { state: { id: id, 
        userName: userName, 
        userType:  userType,
        token: token
    } });
    }

    async function handleCreateReport(){
      navigate("/report", { state: { id: id, 
        userName: userName, 
        userType:  userType,
        token: token
    } });
    }
    async function handlereportchart(){
      navigate("/charts", { state: { id: id, 
        userName: userName, 
        userType:  userType,
        token: token
    } });
    }

    async function handleCustomization(){
      const response = await axios.get(`http://localhost:3000/api/customization/styleCustomize/find`, {
          withCredentials: true 
      });
      console.log('handleCustomization', response.data);
      if(response.status == 200){
        navigate("/styleCustomize", { state: { id: id, 
          userName: userName, 
          userType:  userType,
          token: token, 
          users: response.data
      } });
      }
      
    }


    async function handleRestore(){
      navigate("/restore", { state: { id: id, 
        userName: userName, 
        userType:  userType,
        token: token
    } });
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:'relative'}}>
      <a className="navbar-brand" href="/" style={{ marginLeft: 10 }}>
        Helpdesk
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav" style={{marginTop:'-40px'}}>
          <li className="nav-item">
            <a className="nav-link" href="#"  style={{position:'absolute', zIndex:'1000'}}>
            </a>
          </li>
          <li className="nav-item" style={{marginLeft:'75px', position:'absolute', zIndex:'1000'}}>
            <a className="nav-link" href="#">
              
            </a>
          </li>
          {state && userType && userType == 'User'&&
            <Dropdown style={{marginLeft:'1130px', position:'absolute', zIndex:'1000'}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Welcome Back {userName}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
            <Dropdown.Item type="button" onClick={handleRegister}>Register User</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleNavUpdate}>Update Profile</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleLogout}>Logout</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleAssignRole}>Assign Roles</Dropdown.Item>

            
            </Dropdown.Menu>
            </Dropdown>
          }
          { state && userType && userType == 'Admin' &&
            <Dropdown style={{marginLeft:'1130px', position:'absolute', zIndex:'1000'}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Welcome Back {userName}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item type="button" onClick={handleRegister}>Register User</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleAssignRole}>Assign Roles</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleNavUpdate}>Update Profile</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleCustomization}>Style Customize</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleRestore}>Recover Data</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleLogout}>Logout</Dropdown.Item>
              
            </Dropdown.Menu>
            </Dropdown>
          }
          {state && userType && userType == 'Manager' &&
            <Dropdown style={{marginLeft:'1130px', position:'absolute', zIndex:'1000'}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Welcome Back {userName}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item type="button" onClick={handleNavUpdate}>Update Profile</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleLogout}>Logout</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleCreateReport}>Create Report</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handlereportchart}>Create Report</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          }
          {state && userType && userType == 'Agent' &&
            <Dropdown style={{marginLeft:'1130px', position:'absolute', zIndex:'1000'}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Welcome Back {userName}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item type="button" onClick={handleNavUpdate}>Update Profile</Dropdown.Item>
              <Dropdown.Item type="button" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;