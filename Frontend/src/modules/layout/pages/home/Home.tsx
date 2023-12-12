import React from 'react';
import {Link} from "react-router-dom";
import logo from "../../../../assets/img/logo.jpeg"
export const Home: React.FC = () => {
    return (
        <>
            <div id="main">
           <div id="nav">
            <img src={logo} alt="" />
            <div id="nlinks">
            <Link to="/">Home</Link>
            <Link to="/contacts/admin">HeadOffice</Link>
            <Link to="/contacts/branch">Branch</Link>
            </div>
           </div>
           <div id="text">
            <div id="heading">Laptops & <br></br> Printers Records</div>
            <div id="headingText">Sugmya Finance's app efficiently manages printer and laptop records, enabling centralized access and control. It tracks device status, facilitates maintenance scheduling, and offers detailed reports for cost analysis and decision-making. This streamlined system optimizes operations and enhances data security. </div>
           </div>
            </div>
        </>
    )
};
export default Home;





