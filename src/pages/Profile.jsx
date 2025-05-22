import { getUserByUsername } from '../api/profileService';
import { useContext, useEffect, useState } from 'react';
import { Container, Form, Card, Button, Image } from 'react-bootstrap'; 
import { AuthContext } from '../contexts/AuthContext'; 
import { getUserBookings } from '../api/bookingService';
import { ListGroup } from 'react-bootstrap';
import { confirmBooking } from '../api/bookingService';
import { deleteBooking } from '../api/bookingService';
import { useUser } from '../hooks/useUser';

const Profile = () => {
  const { userProfile, updateProfile } = useUser();
  const [error, setError] = useState(); // stores errors
  const [ isLoading, setIsLoading ] = useState(false); // display that the site is loading
  const { currentUser } = useContext(AuthContext); // gets the user from the auth context
  const [ user, setUser ] = useState(null); // stores user profile data
  const [ bookings, setBookings ] = useState([]);
  const [ isEditing, setIsEditing ] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    age: userProfile?.age || "",
    bio: userProfile?.bio || "",
    });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // initialize loading
      try {
        // user data
        const data = await getUserByUsername(currentUser?.username); 
        console.log(data); // log userData for debugging
        setUser(data); // update user state with the fetched data
      } catch (error) {
        setError(error.message); // stores the error if the request isnt working
      } finally {
        setIsLoading(false); // removes loading
      }
    };

    fetchData(); // this executes the data fetching function
  }, [currentUser?.username]); // this is a dependency array, it will update when the username is changed so that a new profile can be shown

  // Handle edit
    const handleEdit = () => {
      setIsEditing(true);
    };
    // Handle input
    const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    };

    // Handle cancel
    const handleCancel = () => {
      setFormData({
        firstName: userProfile?.firstName || "",
        lastName: userProfile?.lastName || "",
        email: userProfile?.email || "",
        age: userProfile?.age || "",
        bio: userProfile?.bio || "",
      })
      setIsEditing(false);
      setError(null);
      setSuccess("");
    };

    // Handle submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess("");
      try {
        await updateProfile(formData);
        setUser(formData);
        setSuccess("Profile updated!")
        setIsEditing(false);
      } catch (error) {
        console.log("Profile update failed: " + error);
      }
    };

  // pending bookings data
  useEffect(() => {
      const fetchBookings = async () => {
        setIsLoading(true);
        try {
          const data = await getUserBookings(currentUser?.userId);
          setBookings(data);
          console.log(JSON.stringify(data));
        } catch (error) {
          console.error("Something went wrong when fetching bookings " +  error)
        } finally {
          setIsLoading(false);
        }
      };

      fetchBookings();
    }, [currentUser.userId]);

    // Accept booking
    const accept = async (id) => {
      setIsLoading(true);
      try {
      const data = await confirmBooking(id);
      setAcceptBooking(data);
      } catch (error) {
          console.error("Something went wrong with the booking: " + error)
      } finally {
        setIsLoading(false);
      }
    };

    // Decline booking
    const decline = async (id) => {
      setIsLoading(true);
      try {
      const data = await deleteBooking(id);
      setDeclineBooking(data);
      } catch (error) {
          console.error("Something went wrong with the booking: " + error)
      } finally {
        setIsLoading(false);
      }
    };

  if (!userProfile) {
    return <div>Loading profile...</div>
  }

  if (isLoading) {
    return<div>Loading ...</div>; // displays a message to the end user that the site is currently loading
  }

  if (error) {
    return <div>Something went wrong! Please refresh the page.</div> // displays a message to the end user if something went wrong
  }

  if (isEditing) {
    console.log("Edit mode - profile.jsx: ", userProfile);
  return (
    <Container className="edit-profile mb-5">
      <h3 className="mb-4">Edit Profile</h3>

        <Form.Group className="mb-3">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            disabled={isLoading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            disabled={isLoading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            disabled={isLoading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            disabled={isLoading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bio:</Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            rows={3}
            value={formData.bio}
            disabled={isLoading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form onSubmit={handleSubmit} className="text-center">
  {error && <p className="error">{error}</p>}
  {success && <p className="success">{success}</p>}

  <div className="d-flex justify-content-center gap-3 mt-4">
    <Button type="submit" variant="success" disabled={isLoading}>
      {isLoading ? "Saving..." : "Save Changes"}
    </Button>
    <Button type="button" variant="secondary" onClick={handleCancel} disabled={isLoading}>
      Cancel
    </Button>
  </div>
</Form>
    </Container>
  );
}

  return (
    <Container className="profile-page mb-5"> 
        {/* profile information */}
          <Card className="profile-card text-center">
            <Card.Body className="userProfileBody">
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
              <Card.Subtitle className="mb-2">
                Bio: {" " + user.bio}
              </Card.Subtitle>
              <Button 
              variant="button" 
              onClick={handleEdit}  
              disabled={isLoading}
              >
                Edit profile
              </Button>
            </Card.Body>
          </Card>

        {/* Pending bookings */}
          <Card className="main-card text-center mb-5 mt-5">
            <Card.Header>Pending bookings</Card.Header>
            <Card.Body>
                {bookings.length > 0 ? (
                  <ListGroup>
                    {bookings.map((bookings) => (
                      <ListGroup.Item key={bookings.id} className="mb-2">
                        <Card>
                          <Card.Body>
                            <Card.Title>Booking id: {bookings.id}</Card.Title>
                            <Card.Text>
                              <div>Status: {bookings.status}</div>
                              <div>Start Date: {new Date(bookings.startDate).toLocaleDateString()}</div>
                              <div>End Date: {new Date(bookings.endDate).toLocaleDateString()}</div>
                              <div>Total amount: {bookings.totalAmount} SEK</div>
                            </Card.Text>
                            <Button className="accept mb-2" variant="primary" onClick={() => accept(bookings.id)}>Accept</Button>
                            <Button className="decline mb-2" variant="primary" onClick={() => decline(bookings.id)}>Decline</Button>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Card.Text>No pending bookings found</Card.Text>
                )}
            </Card.Body>
          </Card>
    </Container>
  );
};

export default Profile;
