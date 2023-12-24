import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/homePage.css";
import "../stylesheets/homePageBackground.scss";
import KnowledgeBase from "../components/knowledgebases"

export default function Knowldgebasess() {

    return (
        <>
          <div className="Home">
            <Navbar />
            <KnowledgeBase />
          </div>
        </>
    );

}