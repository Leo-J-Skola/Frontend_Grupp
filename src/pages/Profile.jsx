import { useAuth } from '../hooks/useAuth';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="Container-1 bg-body-tertiary pt-5 " data-bs-theme="light">
      <Container>
        <Row className="mb-5">
          <Col>
            <h2> Profile </h2>
            
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <h4> Column 2 </h4>
            
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <h4> Column 2 </h4>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
