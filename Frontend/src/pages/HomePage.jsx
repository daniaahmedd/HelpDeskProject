import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../stylesheets/homePage.css";
import "../stylesheets/homePageBackground.scss";

export default function HomePage() {

    return (
        <>
          <Navbar />
             <img src="./assets/Project Logo.png"></img>
          <h3 style={{ textAlign: "left", margin: "20px",color:'white' }}>
            Helpdesk 
          </h3>
        </>
    );

}