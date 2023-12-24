// WorkFlowPage.jsx
import React from 'react';
import WorkFlow from '../components/WorkFlow';  
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/WorkFlow.css";          

export default function WorkFlowPage() {
    const addWorkflow = (workflow) => {
        console.log(workflow); 
    };

    return (
        <div className="workflow-page">  {

        }
            {

            }
            <WorkFlow addWorkflow={addWorkflow} />
        </div>
    );
}
