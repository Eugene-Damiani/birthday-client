import React, { Fragment } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import logo from '../../birthday.jpg'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#wishlists">Wish Lists</Nav.Link>
    <Nav.Link href="#wishlist-create">Add Wish List</Nav.Link>
    <NavDropdown title="Settings" alignRight id="settings-dropdown">
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link to="#">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="blue" variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img className="photo" src={logo} alt="Logo" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
