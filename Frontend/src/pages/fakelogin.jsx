import React, { useState } from 'react';
import axios from 'axios';
import LiveChat from './livechat';
import { useNavigate } from "react-router-dom";


const FakeLogin = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    async function handleLogin() {
        await axios.post(
            `http://localhost:3000/api/chat/triallogin`,
            {
                email: email
            },
            { withCredentials: true }
        )
            .then(data => {
                console.log(data);
                navigate("/ticket");
            })
            .catch(error => {
                console.log("ERRRROR");
                console.error(error);
            });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default FakeLogin;
