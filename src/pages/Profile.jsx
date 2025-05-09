import '../profile.css';
import { useAuth } from '../hooks/useAuth';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <Container className="profile-page mb-5">
      <Row>
        {/* left profile information */}
        <Col>
          <Card className="profile-card text-center">
            <Card.Body>
              <Card.Header>Information</Card.Header>
              <Image src="https://i.pinimg.com/474x/45/a2/2b/45a22b2285f2f60cf3a9c4739fe24b70.jpg" roundedCircle fluid/>
              <Card.Title className="fullname mb-2">Super Mario</Card.Title>
              <Card.Subtitle className="age mb-2">Age</Card.Subtitle>
              <Card.Subtitle className="mail mb-2">Mail</Card.Subtitle>
              <Card.Subtitle className="phone mb-2">Phone</Card.Subtitle>
              <Card.Subtitle className="mb-2">Rating</Card.Subtitle>
              <Button variant="primary" className="mt-2">Edit profile</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* main content */}
        <Col> 
          {/* listings */}
          <Card className="main-card mb-5">
            <Card.Header>Current listings</Card.Header>
            <Card.Body>
              <Row>
                
              </Row>
            </Card.Body>
          </Card>

          {/* booking */}
          <Card className="main-card mb-5">
            <Card.Header>Previous bookings</Card.Header>
            <Card.Body>
              <Row>
                
              </Row>
            </Card.Body>
          </Card>

          {/* reviews */}
          <Card className="main-card mb-5">
            <Card.Header>Reviews of your listings</Card.Header>
            <Card.Body>
              <Row>
                
              </Row>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default Profile;
