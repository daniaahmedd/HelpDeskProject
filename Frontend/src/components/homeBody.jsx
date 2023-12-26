import React from "react";
import "../stylesheets/homePage.css"
import "../stylesheets/homePageBackground.scss";
import logo from '../assets/Projectlogo.png';
import LoginSignUp from "../components/LoginSignUp";
import { useLocation } from "react-router-dom";

export default function HomeBody() {
    const [modalShow, setModalShow] = React.useState(false);
    const {state} = useLocation();
    if(state){
    var { id, userName, userType } = state;
    }

    return(
        <>
        <div className="home_body">
            <div className="introSection" style={{display:"inline-block", position:'relative'}}>
                <img src={logo} style={{width:"90px", marginLeft:"15px", marginTop:"15px"}}/>
                <div className="introSecText">
                    <h2 className="homeTitle" style={{color:'white', marginTop:"10px", fontFamily:"Roborto_Slab"}}>Helpdesk</h2>
                    <h3 style={{color:'white',fontWeight: "light", fontFamily:"Roborto_Slab", marginBottom:"25px"}}>
                        Support your external customers or maintain a service desk for internal users with helpdesk projects
                    </h3>
                    <h6 style={{color:'white',fontFamily:"Roborto_Slab"}}>
                        Unlimited reporters and 3 agents for free. Cloud or server – Get started now!
                    </h6>
                    <button type="button" className="btn btn-outline-secondary introSecButton" style={{position:'absolute'}}>
                        <span style={{color:'white'}}>Get Started</span>
                    </button>
                </div>
            </div>
            {state && userType && userType == 'User' &&
                <div className="loginSection" style={{display:"inline-block", position:'relative', top:"-57px"}}>
                    <div className="loginSecText">
                        <h2 className="homeTitle" style={{color:'white', marginTop:"47px", fontFamily:"Roborto_Slab", textAlign:"center"}}>Let our Helpdesk streamline your customer support service</h2>
                        <h3 style={{color:'white', fontWeight: "light", fontFamily:"Roborto_Slab", marginBottom:"25px", marginTop:"20px"}}>
                            Get the essentials to organize your support or service desk processes in helpdesk and save your team the time and effort of switching context – support tickets are easily managed next to other projects in your organization.
                        </h3>
                    </div>
                </div>
            }
            {state && userType && userType == 'Admin' &&
                <div className="loginSection" style={{display:"inline-block", position:'relative', top:"-57px"}}>
                    <div className="loginSecText">
                        <h2 className="homeTitle" style={{color:'white', marginTop:"47px", fontFamily:"Roborto_Slab", textAlign:"center"}}>Let our Helpdesk streamline your customer support service</h2>
                        <h3 style={{color:'white', fontWeight: "light", fontFamily:"Roborto_Slab", marginBottom:"25px", marginTop:"20px"}}>
                            Get the essentials to organize your support or service desk processes in helpdesk and save your team the time and effort of switching context – support tickets are easily managed next to other projects in your organization.
                        </h3>
                    </div>
                </div>
            
            }
            {state && userType && userType == 'Manager' &&
                <div className="loginSection" style={{display:"inline-block", position:'relative', top:"-57px"}}>
                    <div className="loginSecText">
                        <h2 className="homeTitle" style={{color:'white', marginTop:"47px", fontFamily:"Roborto_Slab", textAlign:"center"}}>Let our Helpdesk streamline your customer support service</h2>
                        <h3 style={{color:'white', fontWeight: "light", fontFamily:"Roborto_Slab", marginBottom:"25px", marginTop:"20px"}}>
                            Get the essentials to organize your support or service desk processes in helpdesk and save your team the time and effort of switching context – support tickets are easily managed next to other projects in your organization.
                        </h3>
                    </div>
                </div>
            
            }
            {state && userType && userType == 'Agent' &&
                <div className="loginSection" style={{display:"inline-block", position:'relative', top:"-57px"}}>
                    <div className="loginSecText">
                        <h2 className="homeTitle" style={{color:'white', marginTop:"47px", fontFamily:"Roborto_Slab", textAlign:"center"}}>Let our Helpdesk streamline your customer support service</h2>
                        <h3 style={{color:'white', fontWeight: "light", fontFamily:"Roborto_Slab", marginBottom:"25px", marginTop:"20px"}}>
                            Get the essentials to organize your support or service desk processes in helpdesk and save your team the time and effort of switching context – support tickets are easily managed next to other projects in your organization.
                        </h3>
                    </div>
                </div>
            
            }
            {!state &&
                <div className="loginSection" style={{display:"inline-block", position:'relative', top:"-57px"}}>
                <div className="loginSecText">
                    <h2 className="homeTitle" style={{color:'white', marginTop:"47px", fontFamily:"Roborto_Slab", textAlign:"center"}}>Let our Helpdesk streamline your customer support service</h2>
                    <h3 style={{color:'white', fontWeight: "light", fontFamily:"Roborto_Slab", marginBottom:"25px", marginTop:"20px"}}>
                        Get the essentials to organize your support or service desk processes in helpdesk and save your team the time and effort of switching context – support tickets are easily managed next to other projects in your organization.
                    </h3>
                    <button role="button" className="btn btn-outline-secondary introSecButton btn-lg" style={{width:'45%', textAlign:"center", marginLeft:'25%', marginTop:'6%', position:'absolute'}} onClick={() => setModalShow(true)}>
                        <span style={{color:'white'}}>Login Now</span>
                    </button>
                </div>
                </div>
            }
            
        </div>

        <LoginSignUp show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )

}