import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function TopNavbarUser() {

const { logout } = useAuth();

const handleLogout = async () => {
    await logout();
}

const { currentUser } = useAuth([]);



return(
      <Navbar bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/"><img src="icons8-home-50.png" alt="brand icon" /></Navbar.Brand>
          <Navbar.Brand href="/">Homi App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link className='profile-btn' href="/profile"><Button>Profile</Button></Nav.Link>
            <Nav.Link className='listing-btn'href="/listing"><Button>Listing</Button></Nav.Link>
            <Button variant="secondary" className='logout-btn' onClick={handleLogout}>Logout</Button>
            <NavDropdown title="About" id="basic-nav-dropdown">
            <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/forgot">Forgot password</NavDropdown.Item>
            </NavDropdown>
            <Form inline>
            <Row>
            <Col xs="auto">
            <Form.Control type="text" placeholder="Search" className=" mr-sm-2"/>
            </Col>
            <Button className='search-btn' type='submit'>Submit</Button>
            <Col xs="auto">
            </Col>
            </Row>
            </Form>
            </Nav>
            </Navbar.Collapse>
            <Navbar.Text>
            Signed in as: <a href="/profile">{currentUser.username}</a>
            </Navbar.Text>
            </Container>
            </Navbar>
)};
export default TopNavbarUser;