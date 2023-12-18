import React,{useState , useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
//import{useCookies} from "react-cookie";
import {Button} from "react-bootstrap"
import "../stylesheets/restore.css";


const RestoreBackup = () =>{
  const [restoreStatus ,setRestoreStatus] = useState(null);
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const restoreBackup = async()=>{
    try{
      if(!cookies.token){
        window.location.ref = '/login';
        return;
      }
      
      const response = await axios.post("http://localhost:3000/api/backup/restore",  {
        withCredentials: true,
      });
      console.log("Server Response:", response);
      setRestoreStatus(response.data.message);
     } catch (error) {
      console.log("Error in restoring backup", error);
      console.log("Error Message:", error.message);
      console.log("Error Response:", error.response); 
      setRestoreStatus("Restore failed");
    }
    
  };
  return(
    <div className="restore">
      <div style={{margin:"30px"}}>
        <Button onClick={restoreBackup}>Start Restoring</Button>
        <p>Status: {restoreStatus}</p>
        <Button onClick = {()=> navigate("/")}>Home Page</Button>
      </div>
    </div>
  );
};
export default RestoreBackup;