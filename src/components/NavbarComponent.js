import React from "react";
import { Navbar, Container } from 'react-bootstrap';
import '../style/NavbarComponent.css'; 

const NavbarComponent = () => {

  const redirectToOfficial = () => {
    window.location.href = 'https://www.starbucks.co.id/'; // Mengalihkan ke link starbuck official
  };

  return (
    <Navbar style={{ backgroundColor: "#e8e4d4" }} variant="dark" expand="lg" className="custom-navbar">
      <Container>
      <Navbar.Brand className="mx-auto">
      <a href="https://www.starbucks.co.id/" target="_blank" rel="noopener noreferrer">
        <img
          style={{ cursor: 'pointer' }}
          src="/assets/images/starbucks.png"
          width="185"
          height="45"
          className="mb-2 zoom-logo"
          alt="Starbucks Logo"
          onClick={redirectToOfficial} // memamnggil const redirectToOfficial
        />
      </a>
    </Navbar.Brand>
        <br />
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
