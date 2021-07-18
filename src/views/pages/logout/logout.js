import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Logout(props) {
    useEffect(() => {
        localStorage.clear();
    });
    return (
        <div className="App"> 
            You have been logout
            <Link to="/login"> Click to login </Link>
        </div>
    )
}