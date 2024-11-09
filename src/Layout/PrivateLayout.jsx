import React from "react";
import AuthNavBar from "../Component/Header/AuthNavBar";
import Footer from "../Component/Footer";
import "../GlobalStyle/GlobalTheme.css";
import "./AuthLayout.css";
import { Container,Row,Col } from "react-bootstrap";
function PrivateWrapper({ children }) {
  return (
    <Container fluid className="base-Container">
      <AuthNavBar />
     {children} 
      <Footer />
    </Container>
  );
}

export default PrivateWrapper;
