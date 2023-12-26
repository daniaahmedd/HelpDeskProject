import Navbar from "../components/navbar";
import HomeBody from "../components/homeBody";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/homePage.css";
import "../stylesheets/homePageBackground.scss";

export default function HomePage() {

    return (
        <>
          <div className="Home">
            <Navbar />
            <HomeBody />
          </div>
        </>
    );

}