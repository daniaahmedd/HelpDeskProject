import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/report.css";
import { useCookies } from "react-cookie";
let backend_url = "http:mongodb://localhost:27017";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReportPage() {
    const [tickets,setTickets] = useState([]);
    const navigate = useNavigate();
    const [cookies, removeCookies] = useCookies([]);

    useEffect(()=>{
      async function fetchData(){
        let uid = localStorage.getItem("userId");
      try {
        console.log("cookies", cookies);
        if (!cookies.token) {
          navigate("/login");
        }

        const response = await axios.get(
          `${backend_url}/Routes/Report/${uid}`,
          { withCredentials: true }

        )
        console.log("response");
      } catch (error) {
        console.log("error");
        console.log(error);
      }

      }
      fetchData();

    },[])
 

    return (
        <>
          <div >
            <Navbar/>
          </div>
        </>
    );

}