import '../profile.css';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';

const BASE_URL = 'http://localhost:8080';

const Profile = () => {
  const [error, setError] = useState();
  const [ isLoading, setIsLoading ] = useState(false);
  const { currentUser } = useAuth();
  const [ userData, setUserData ] = useState(null);
  const [ listing, setListing ] = useState([]);
  const [ booking, setBooking ] = useState([]);
  const [ favorite, setFavorite ] = useState([]);
  

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      try {
        // users
        const userResponse = await fetch(`${BASE_URL}/user`);
        const userData = await userResponse.json();
        setUserData(userData);

        // listings
        const listingResponse = await fetch(`${BASE_URL}/listing`);
        const listingData = await listingResponse.json();
        setListing(listing);

        // bookings
        const bookingResponse = await fetch(`${BASE_URL}/booking`);
        const bookingData = await bookingResponse.json();
        setBooking(booking);

        // favorites
        const favoriteResponse = await fetch(`${BASE_URL}/favorite`);
        const favoriteData = await favoriteResponse.json();
        setFavorite(favorite);

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return<div>Loading ...</div>;
  }

  if (error) {
    return <div>Something went wrong! Please refresh the page.</div>
  }


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
              <Card.Subtitle className="mb-2">Bio</Card.Subtitle>
              <Button variant="primary" className="mt-2">Edit profile</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* main content */}
        <Col> 

          {/* listings */}
          <Card className="main-card mb-5">
            <Card.Header>Your current listings</Card.Header>
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

          {/* favorites */}
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
