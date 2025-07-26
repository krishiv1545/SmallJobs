import React, { useEffect, useRef } from "react";
import Footer from '@/Base/Footer';
import Navbar from '@/Base/Navbar';
import "./catalog.css";

function Catalog() {
    const catalogRef = useRef(null);
    const navbarRef = useRef(null);

    useEffect(() => {
        function adjustMargin() {
            const navbarEl = document.querySelector(".navbar");
            if (catalogRef.current && navbarEl) {
                const navHeight = navbarEl.offsetHeight;
                catalogRef.current.style.marginTop = `${navHeight}px`;
            }
        }

        adjustMargin();
        window.addEventListener("resize", adjustMargin);

        return () => window.removeEventListener("resize", adjustMargin);
    }, []);

    return (
        <div ref={catalogRef} className="catalog-body">
            <Navbar />
            <div>
                <h1>Helloooooo</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Catalog;
