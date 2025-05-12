import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";


const BlogNavbar = () => {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand">
          <img src="/logo192.png" alt="Logo" width="40" className="me-2" />
          Strive School
        </Link>

        <div>
          <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
          <Link to="/register" className="btn btn-primary">Registrati</Link>
        </div>
      </div>
    </nav>
  );
};

export default BlogNavbar;
