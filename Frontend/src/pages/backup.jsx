import React,{useState , useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
//import{useCookies} from "react-cookie";
import {Button} from "react-bootstrap"
import "../stylesheets/backup.css";

const CreateBackup = () =>{
  const [backupStatus ,setBackupStatus] = useState(null);
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const handleBackup = async()=>{
    try{
      if(!cookies.token){
        window.location.ref = '/login';
        return;
      }
      
      const response = await axios.post("http://localhost:3000/api/backup/create",  {
        withCredentials: true,
      });
      console.log("Server Response:", response);
      setBackupStatus(response.data.message);
     } catch (error) {
      console.log("Error in creating backup", error);
      console.log("Error Message:", error.message);
      console.log("Error Response:", error.response); 
      setBackupStatus("Backup failed");
    }
    
  };
  return(
    <div className="backup">
      <div style={{margin:"30px"}}>
        <Button onClick={handleBackup}>Start Backup</Button>
        <p>Status: {backupStatus}</p>
        <Button onClick = {()=> navigate("/")}>Home Page</Button>
      </div>
    </div>
  );
};
export default CreateBackup;