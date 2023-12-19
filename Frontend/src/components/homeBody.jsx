import React from "react";
import '../stylesheets/homePage.css'
import "../stylesheets/homePageBackground.scss";
import logo from '../assets/Projectlogo.png'; // Tell Webpack this JS file uses this image



export default function HomeBody() {
    return(
        <>
        <div className='home_body'>
            <div className="introSection">
                <img src={logo} style={{width:"90px", marginLeft:"15px", marginTop:"15px"}}/>
                <div className="introSecText">
                    <h2 className="homeTitle" style={{color:'white', marginTop:"10px", fontFamily:"Roborto_Slab"}}>Helpdesk</h2>
                    <h3 style={{color:'white',fontWeight: "light", fontFamily:"Roborto_Slab", marginBottom:"25px"}}>
                        Support your external customers or maintain a <br/> service desk for internal users with helpdesk <br/> projects
                    </h3>
                    <h6 style={{color:'white',fontFamily:"Roborto_Slab"}}>
                        Unlimited reporters and 3 agents for free. Cloud or server – Get started now!
                    </h6>
                    <button type="button" class="btn btn-outline-secondary" className="introSecButton">Get Started</button>
                </div>
                
            </div>
        </div>
        </>
    )

}