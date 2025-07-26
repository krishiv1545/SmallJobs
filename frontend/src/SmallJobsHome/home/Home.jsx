import React, { useRef, useEffect, useState } from "react"
import "./home.css"
import Footer from '@/Base/Footer';
import { Link } from "react-router-dom";


function Home() {
  const homeRef = useRef(null);
  const [angle, setAngle] = useState(-45); // Start at -45 degrees (top-left angled)

  useEffect(() => {
    const home = homeRef.current;

    const handleMouseMove = (e) => {
      const rect = home.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const centerX = rect.width / 2;
      
      // Calculate angle based on mouse position relative to center
      // Left side: more negative angle, Right side: less negative/positive angle
      const relativeX = (mouseX - centerX) / centerX; // Range: -1 to 1
      const newAngle = -45 + (relativeX * 20);
      
      setAngle(newAngle);
      
      // Set CSS custom properties for position
      const x = (mouseX / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      home.style.setProperty('--x', x + '%');
      home.style.setProperty('--y', y + '%');
      home.style.setProperty('--angle', newAngle + 'deg');
    };

    if (home) {
      home.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (home) {
        home.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="home" ref={homeRef}>
      <div className="box first-box">
        <div className="logo-wrapper">
          <img src="./templogo.png" alt="SmallJobs Logo" className="logo" />
        </div>

        <h1>SmallJobs</h1>
        <div className="hr"></div>
        <ul>
          <li><Link to="/catalog" class="nav-link">Application Catalog</Link></li>
          {/* <li><a href="#">CS 101 Community</a></li>
          <li><a href="#">Grow (To-do)</a></li> */}
        </ul>
      </div>
      <div className="box second-box"></div>
      <Footer />
    </div>
  )
}

export default Home
