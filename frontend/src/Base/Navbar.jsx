import React, { useRef, useEffect, useState } from "react"
import "../SmallJobsHome/home/home.css"
import { Link } from "react-router-dom";


function Navbar() {

    return (
        <div className="navbar">
            <div className="smalljobs">
                <Link to="/" className="vertical-center">
                <img src="./templogobigger.png" alt="" className="navbar-logo"/>SmallJobs
                </Link>
            </div>
            <div className="links">
            <Link to="/" className="navbar-link">Home</Link>
            </div>
        </div>
    )
}

export default Navbar