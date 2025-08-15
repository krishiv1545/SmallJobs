import React, { useState, useEffect, useRef } from "react";
import Footer from "@/Base/Footer";
import Navbar from "@/Base/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./catalog.css";
import { Link } from "react-router-dom";
import apiService from "@/utils/api";

function Catalog() {
  const catalogRef = useRef(null);
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    function adjustMargin() {
      const navbarEl = document.querySelector(".navbar");
      if (catalogRef.current && navbarEl) {
        const navHeight = navbarEl.offsetHeight;
        catalogRef.current.style.paddingTop = `${navHeight + 60}px`;
      }
    }

    adjustMargin();
    window.addEventListener("resize", adjustMargin);
    return () => window.removeEventListener("resize", adjustMargin);
  }, []);

  useEffect(() => {
    apiService
      .get("/catalog/")
      .then((data) => {
        setAllResults(data);
        setFilteredResults(data);
      })
      .catch((error) => console.error("Failed to fetch catalog:", error));
  }, []);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    setFilteredResults(
      allResults.filter((item) => item.name.toLowerCase().includes(lowerQuery))
    );
  }, [query, allResults]);

  return (
    <div>
      <Navbar />
      <div ref={catalogRef} className="catalog-body">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search our catalog..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="catalog-grid">
          {filteredResults.map((item) => (
            <Link to={`/${item.react_route}`} className="nav-link">
              <div key={item.id} className="catalog-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="shader"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Catalog;
