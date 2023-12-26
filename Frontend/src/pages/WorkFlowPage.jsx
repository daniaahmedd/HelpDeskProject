import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkFlowPage = () => {
    const [workflows, setWorkflows] = useState([]);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const fetchWorkflows = async () => {
        try {
            const response = await axios.post('/api/workflows', { category, subcategory });
            setWorkflows(response.data.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h1>WorkFlow Page</h1>
            <form onSubmit={fetchWorkflows}>
                <label>
                    Category:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </label>
                <br />
                <label>
                    Subcategory:
                    <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
                </label>
                <br />
                <button type="submit">Fetch Workflows</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {workflows.length > 0 ? (
                <ul>
                    {workflows.map((workflow) => (
                        <li key={workflow.id}>{workflow.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No workflows found</p>
            )}
        </div>
    );
};

export default WorkFlowPage;
