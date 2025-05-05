import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

function TopNavbarUser() {

const { logout } = useAuth();

const handleLogout = async () => {
    await logout();
}


return(
      <Navbar bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/"><img src="icons8-home-50.png" alt="brand icon" /></Navbar.Brand>
          <Navbar.Brand href="/">Homi App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/profile"><Button className='profile-btn'>Profile</Button></Nav.Link>
            <Nav.Link href="/logout"><Button className='logout-btn' onClick={handleLogout}>Logout</Button></Nav.Link>
              <NavDropdown title="About" id="basic-nav-dropdown">
                <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/forgot">Forgot password</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
)};
export default TopNavbarUser;