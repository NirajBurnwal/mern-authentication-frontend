import React from 'react'
import { NavLink } from 'react-router-dom';

const Error = () => {
    const mystyle = {
        margin: "auto",
        position: "relative",
        alignItems: "center",
        height: "60vh",
        display: "flex",
        top: "50px",
        flexDirection: "column"
    };
    return (
        <>
            <div style={mystyle}>
                <img style={{ width: "835px" }} src="./404-error-page-not-found.jpg" alt="error-img" />
                <h3><NavLink to="/">Back to Homepage</NavLink></h3>
            </div>
        </>
    )
}

export default Error
