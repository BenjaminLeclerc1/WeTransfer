import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "../assets/css/NavBar.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/users/logout", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "deconnected") {
          localStorage.removeItem("token");

          setIsLoggedIn(false);

          navigate("/login");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="shadow-sm p-3 bg-body-tertiary rounded"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-4">
          WeTransfer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-secondary">
              Accueil
            </Nav.Link>

            {isLoggedIn ? (
              <>
                <NavDropdown
                  title="Options"
                  id="nav-dropdown"
                  className="text-secondary"
                >
                  <NavDropdown.Item as={Link} to="/filelist">
                    Listes des transferts
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as="button"
                    onClick={handleLogout}
                    className="text-danger"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-secondary">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-secondary">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
