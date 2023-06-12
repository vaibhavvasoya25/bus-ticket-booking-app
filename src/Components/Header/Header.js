import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar bg="rgb(230, 230, 230)" expand="lg">
        <Container>
          <Navbar.Brand>
            {" "}
            <img
              alt="bus"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTje5ng29LMi21sw-_N-tU6hRjZsaGXlS5RoSDXK6CgmZlkfH_CCAMKUU5d4kjB9w5OUgnSYG07Z6A&usqp=CAU&ec=48600113"
              width="100"
              height="70"
              className="d-inline-block align-center"
            />{" "}
            <span style={{ fontSize: "xx-large", fontFamily: "cursive" }}>
              MyBus
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link className="nav" to="/">
                  Dashboard
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="nav" to="/reservation">
                  Reservation
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="nav" to="/allocateSeat">
                  Allocate Seat
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
