import '../profile.css';
import { Link } from 'react-router-dom';
import { getUserByUsername } from '../api/profileService';
import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap'; 
import { AuthContext } from '../contexts/AuthContext'; 

const Profile = () => {
  const [error, setError] = useState(); // stores errors
  const [ isLoading, setIsLoading ] = useState(false); // display that the site is loading
  const { currentUser } = useContext(AuthContext); // gets the user from the auth context
  const [ user, setUser ] = useState([]); // stores user profile data

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // initialize loading

      try {
        // user data
        const userData = await getUserByUsername(currentUser.username); 
        console.log(userData); // log userData for debugging
        setUser(userData); // update user state with the fetched data

        // user listings data
        

        // user bookings data
        

        // user favorites data
        

      } catch (error) {
        setError(error.message); // stores the error if the request isnt working
      } finally {
        setIsLoading(false); // removes loading
      }
    };

    fetchData(); // this executes the data fetching function
  }, [currentUser?.username]); // this is a dependency array, it will update when the username is changed so that a new profile can be shown

  if (isLoading) {
    return<div>Loading ...</div>; // displays a message to the end user that the site is currently loading
  }

  if (error) {
    return <div>Something went wrong! Please refresh the page.</div> // displays a message to the end user if something went wrong
  }

  return (
    <Container className="profile-page mb-5">
      <Row>
        {/* profile information */}
        <Col>
          <Card className="profile-card text-center">
            <Card.Body>
              <Card.Header>Information</Card.Header>
              <Image 
              src="https://openclipart.org/image/2000px/247319" 
              roundedCircle 
              fluid/>
              <Card.Title className="fullname mb-2">
                {user.firstName + " " }{ user.lastName} 
              </Card.Title>
              <Card.Subtitle className="age mb-2">
                Age: {" " + user.age}
              </Card.Subtitle>
              <Card.Subtitle className="mail mb-2">
                Mail: {" " + user.email}
              </Card.Subtitle>
              <Card.Subtitle className="phone mb-2">
                Phone: {" " + user.phone}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2">
                Bio: {" " + user.bio}
              </Card.Subtitle>
              <Link to="/edit-user">
                <Button variant="primary" className="mt-2">
                  Edit profile
                </Button>
              </Link>
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
