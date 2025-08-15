import React, { useState, useEffect } from "react";
import "../SmallJobsHome/home/home.css";
import { Link, useNavigate } from "react-router-dom";
import "./base.css";
import apiService from "@/utils/api";

function Navbar() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("=== Checking user authentication ===");
    apiService
      .get("/auth/me")
      .then((data) => {
        console.log("Auth check response:", data);
        if (!data.error) {
          setUser(data);
          console.log("User authenticated:", data);
        } else {
          setUser(null);
          console.log("User not authenticated");
        }
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        setUser(null);
      });
  }, []);

  function openModal(id) {
    setActiveModal(id);
    setFormData({ fullname: "", email: "", password: "" });
  }

  function closeModal() {
    setActiveModal(null);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();
    try {
      const data = await apiService.post("/auth/signup", formData);
      console.log("Signup successful!");
      setUser(data.user);
      closeModal();
      try {
        await apiService.get("/auth/me");
      } catch {}
      navigate("/hangout/home");
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const data = await apiService.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      setUser(data.user);
      console.log("Login successful!");
      closeModal();
      // Confirm session is active before navigating
      try {
        await apiService.get("/auth/me");
      } catch {}
      // Notify listeners that auth state changed
      window.dispatchEvent(new Event("auth:login"));
      navigate("/hangout/home");
    } catch (error) {
      alert(error.message || "Login failed");
    }
  }

  async function handleLogoutSubmit(e) {
    e.preventDefault();
    try {
      await apiService.post("/auth/logout");
      console.log("Logged out!");
      setUser(null);
      // notify listeners to clear data
      window.dispatchEvent(new Event("auth:logout"));
      navigate("/hangout/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div>
      <div className="navbar">
        <div className="smalljobs">
          <Link to="/" className="vertical-center">
            <img src="/templogobigger.png" alt="" className="navbar-logo" />
            SmallJobs
          </Link>
        </div>
        <div className="links">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {/* Auth buttons logic */}
          {!user && (
            <>
              <button
                className="auth-btn signup-btn"
                onClick={() => openModal("signup")}
              >
                Sign Up
              </button>
              <button
                className="auth-btn login-btn"
                onClick={() => openModal("login")}
              >
                Log In
              </button>
            </>
          )}

          {user && (
            <>
              <button
                className="auth-btn logout-btn"
                onClick={handleLogoutSubmit}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Signup Modal */}
      {activeModal === "signup" && (
        <div className="modal open-modal">
          <button className="close-btn" onClick={closeModal}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <h2>Create Account</h2>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}

      {/* Login Modal */}
      {activeModal === "login" && (
        <div className="modal open-modal">
          <button className="close-btn" onClick={closeModal}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h2>Log In</h2>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      )}

      {/* Modal background */}
      <div
        className={`dark-shader ${activeModal ? "open" : ""}`}
        onClick={closeModal}
      ></div>
    </div>
  );
}

export default Navbar;
