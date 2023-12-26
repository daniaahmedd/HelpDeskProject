import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkflowForm = () => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [workflows, setWorkflows] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const getAllWorkflows = async () => {
        try {
            if (!category || !subcategory) {
                setErrorMessage('Category and subcategory must be provided');
                return;
            }

            const response = await axios.post('/api/workflows', { category, subcategory });
            const { data } = response.data;

            if (data.length === 0) {
                setErrorMessage(`No workflows found for category: ${category} and subcategory: ${subcategory}`);
            } else {
                setWorkflows(data);
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error fetching workflows:', error);
            setErrorMessage(`Error fetching workflows: ${error.message}`);
        }
    };

    useEffect(() => {
        getAllWorkflows();
    }, []);

    return (
        <div>
            <h1>Workflow Form</h1>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} placeholder="Subcategory" />
            <button onClick={getAllWorkflows}>Get Workflows</button>
            {errorMessage && <p>{errorMessage}</p>}
            {workflows.length > 0 && (
                <ul>
                    {workflows.map((workflow) => (
                        <li key={workflow.id}>{workflow.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WorkflowForm;
