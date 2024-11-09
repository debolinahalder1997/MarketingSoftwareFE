import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas, Nav, Button, Container, Navbar } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Image from "../../Asset/Nimbus_Logo_Transparent_white.png";
import "./authNavBar.css";
import "../../GlobalStyle/GlobalTheme.css";
import { ClearState } from "../../Slice/AuthSlice";
function AuthNavBar() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // Menu items array with icons and labels
  const menuItems = [
    { name: "Home", href: "/home", iconName: "house" },
    { name: "Explore", href: "/explore", iconName: "compass" },
    { name: "Messages", href: "/messages", iconName: "envelope" },
    { name: "Zone", href: "/settings", iconName: "gear" },
  ];

  // Toggle the offcanvas sidebar (ribbon)
  function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.classList.toggle("closed");
    const title = document.getElementById("title-h");
    title.classList.toggle("closed");
    const logo = document.getElementById("Header-logo");
    logo.classList.toggle("closed");
    setShow(!show);
  }
  return (
    <nav className=" px-md-4 py-1 my-0 navbar navbar-expand">
      <div className="sidebar" id="mySidebar">
        <div className="sidebar-header ml-3">
          <h6 id="title-h" className="sidebar-title">
            Menu
          </h6>
          <button className="toggle-btn" onClick={toggleNav}>
            <i className="bi bi-list"></i>
          </button>
        </div>
        <div className="black-nav">
          <Link to={"/auth"}>
            <i className="bi bi-bar-chart"></i> <span>Dashboard</span>
          </Link>
          <Link to={"/auth/area"}>
            <i className="bi bi-geo-alt-fill"></i> <span>Area Manager</span>
          </Link>
          <Link to="/auth/customer">
            <i className="bi bi-person-fill"></i> <span>Customer Manager</span>
          </Link>
          <Link to="/auth/feedback">
            <i className="bi bi-hand-thumbs-up-fill"></i>
            <span>Feedback Manager</span>
          </Link>
          <Link to="/auth/geo-loc">
            <i className="bi bi-crosshair"></i>
            <span>Location Manager</span>
          </Link>
        </div>
      </div>
      <div className="main d-flex align-items-center justify-content-between">
        <nav
          href="https://www.nimbussystems.co.in/"
          className="nav-logo"
          id="Header-logo"
        >
          <img src={Image} alt="Nimbus System Pvt. Ltd." width="100%" />
        </nav>
        <nav>
          <Link>
            <i className="bi bi-person-circle white-icon"></i>
          </Link>
          <Link>
            <i className="bi bi-gear-fill white-icon"></i>
          </Link>
          <Link>
            <i className="bi bi-bell-fill white-icon"></i>
          </Link>
          <Button
            variant="link"
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            <i className="bi bi-box-arrow-right white-icon"></i>
          </Button>
        </nav>
      </div>
    </nav>
  );
}

export default AuthNavBar;
