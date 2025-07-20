import React, { useRef, useEffect, useState } from "react"
import "../SmallJobsHome/home/home.css"

function Footer() {

    return (
        <div className="footer">
            <p className="footer-text">
            &copy; SmallJobs | Developed by{" "}
            <a
                className="footer-link"
                href="https://krishiv1545.github.io/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Krishiv K.
            </a>{" "}
            | <span className="footer-tagline">Star Child wants us to Hope. So we Hope.</span>
            </p>
        </div>
    )
}

export default Footer