import '../profile.css';
import api from '../api/axios';
import { getUserByUserName } from '../api/profileService';
import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const [error, setError] = useState();
  const [ isLoading, setIsLoading ] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [ user, setUser ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // user data
        const userData = await getUserByUserName(currentUser.username);
        console.log(userData);
        setUser(userData);

        // user listings data


        // user bookings data
        
        
        // user favorites data
        

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.username]);

  if (isLoading) {
    return<div>Loading ...</div>;
  }

  if (error) {
    return <div>Something went wrong! Please refresh the page.</div>
  }

  return (
    <Container className="profile-page mb-5">
      <Row>
        {/* profile information */}
        <Col>
          <Card className="profile-card text-center">
            <Card.Body>
              <Card.Header>Information</Card.Header>
              <Image src="https://openclipart.org/image/2000px/247319" roundedCircle fluid/>
              <Card.Title className="fullname mb-2">{user.firstName + " " }{ user.lastName} </Card.Title>
              <Card.Subtitle className="age mb-2">Age: {" " + user.age}</Card.Subtitle>
              <Card.Subtitle className="mail mb-2">Mail: {" " + user.email}</Card.Subtitle>
              <Card.Subtitle className="phone mb-2">Phone: {" " + user.phone}</Card.Subtitle>
              <Card.Subtitle className="mb-2">Bio: {" " + user.bio}</Card.Subtitle>
              <Button variant="primary" className="mt-2">Edit profile</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col> 
          {/* Current listings */}
          <Card className="main-card mb-5">
            <Card.Header>Current listings</Card.Header>
            <Card.Body>
              <Row>
                
              </Row>
            </Card.Body>
          </Card>

          {/* Previous bookings */}
          <Card className="main-card mb-5">
            <Card.Header>Previous bookings</Card.Header>
            <Card.Body>
              <Row>
                
              </Row>
            </Card.Body>
          </Card>

          {/* Favorite listings */}
          <Card className="main-card mb-5">
            <Card.Header>Favorite listings</Card.Header>
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
