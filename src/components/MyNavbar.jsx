import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

function TopNavbar() {
  const {currentUser, logout} = useAuth();

  const isAdmin =
     currentUser && currentUser.roles && currentUser.roles.includes("ADMIN");
  
  const isUser =
     currentUser && currentUser.roles && currentUser.roles.includes("USER");

  if(isUser) {
    return (
      <Navbar bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/"><img src="icons8-home-50.png" alt="brand icon" /></Navbar.Brand>
          <Navbar.Brand href="/">Homi App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/profile"><Button className='profile-btn'>Profile</Button></Nav.Link>
            <Nav.Link href="/register"><Button className='register-btn'>Register</Button></Nav.Link>
              <NavDropdown title="About" id="basic-nav-dropdown">
                <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/forgot">Forgot password</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  } else {
    return (
      <Navbar bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/"><img src="icons8-home-50.png" alt="brand icon" /></Navbar.Brand>
          <Navbar.Brand href="/">Homi App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/login"><Button className='login-btn'>Login</Button></Nav.Link>
            <Nav.Link href="/register"><Button className='register-btn'>Register</Button></Nav.Link>
              <NavDropdown title="About" id="basic-nav-dropdown">
                <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/forgot">Forgot password</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default TopNavbar;