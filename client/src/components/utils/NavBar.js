import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import { userSignout } from "../../redux/user/UserAction";

function NavBar() {
  const cartData = useSelector((state) => state.cart.cart.cartItems);
  const likeData = useSelector((state) => state.like.like.likeItems);
  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();
  const navigator = () => {
    navigate("/search");
  };
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <>
      <Navbar className="navbar">
        <Container className="navbarContainer">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                className="imgBrand"
                src="figma/mainLogoB.png"
                alt="Main Logo"
              ></img>
            </Navbar.Brand>
          </LinkContainer>

          <Nav className="searchNav me-auto">
            <form
              className="searchForm"
              onSubmit={submitHandler}
              onClick={navigator}
            >
              <input
                type="text"
                aria-label="Search Products"
                placeholder="Serch"
                onChange={(e) => setQuery(e.target.value)}
                name="q"
                id="q"
              />
              <button className="searchbutton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </form>
          </Nav>

          <Nav className="Nav nava">
            <Nav></Nav>

            <Nav> 
              {userInfo ? (
                <Nav className="Nav nava NavDropdown">
                  hello {userInfo.name}
                </Nav>
              ) : (
                <Link className="" to="/signin">
                  Sign In
                </Link>
              )}
            </Nav>
          </Nav>
        </Container>
      </Navbar>

      <Navbar expand="lg" className="navbara">
        <Container>
          <Navbar.Toggle
            id="toggleax"
            className=" togglea"
            bg="dark"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse className="collapsea" id="basic-navbar-nav">
            <Nav className="me-auto ">
              <Nav>
                {" "}
                <Link to="/products">products</Link>
              </Nav>
              <Nav>
                {" "}
                <Link to="/categories">Categories</Link>
              </Nav>
              <Nav>
                {" "}
                <Link to="/discounts">Discounts</Link>
              </Nav>
              <Nav>
                {" "}
                <Link to="/offers">Offers</Link>
              </Nav>

              <Nav className="">
                <Nav>
                  <Link to="/cart">
                    <i className="fa-solid fa-bag-shopping"></i>
                    {cartData.length > 0 && (
                      <Badge pill bg="danger">
                        {cartData.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                </Nav>
                <Nav>
                  <Link to="/like">
                    <i class="fa-solid fa-heart"></i>
                    {likeData.length > 0 && (
                      <Badge pill bg="danger">
                        +
                      </Badge>
                    )}
                  </Link>
                </Nav>
                <Nav>
                  <Link to="/profile">
                    <i className="fa-regular fa-user"></i>
                  </Link>
                </Nav>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
