import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';

const Profile = () => {
  const { userProfile, updateProfile, loading, error, setError } = useUser();
  console.log("Initial userProfile - profile.jsx: ", userProfile); // for debugging

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    age: userProfile?.age || "",
    bio: userProfile?.bio || "",
    profilePic: userProfile?.profilePic || ""
    });
    const [success, setSuccess] = useState("");

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    };

    const handleCancel = () => {
      setFormData({
        firstName: userProfile?.firstName || "",
        lastName: userProfile?.lastName || "",
        email: userProfile?.email || "",
        age: userProfile?.age || "",
        bio: userProfile?.bio || "",
        profilePic: userProfile?.profilePic || ""
      })

      setIsEditing(false);
      setError(null);
      setSuccess("");
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess("");

      try {
        await updateProfile(formData);
        setSuccess("Profile updated!")
        isEditing(false);
      } catch (error) {
        console.log("Profile update failed: " + error);
      }
    };

    if (!userProfile) {
      return <div>Loading profile...</div>
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
            disabled={loading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            disabled={loading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            disabled={loading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            disabled={loading}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Profile Picture image url:</Form.Label>
          <Form.Control
            type="text"
            name="profilePic"
            value={formData.profilePic}
            disabled={loading}
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
            disabled={loading}
            onChange={handleInputChange}
          />
        </Form.Group>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>{' '}
        <Button type="button" variant="secondary" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

  console.log("Before render - profile.jsx:", userProfile);
  return (
    <Container className="profile-page mb-5">
      <Row>
        {/* profile information */}
        <Col>
          <Card className="profile-card text-center mb-5 mt-5">
            <Card.Body>
              <Card.Header>Your profile</Card.Header>

              <Image 
              src="https://openclipart.org/image/2000px/247319"
              roundedCircle 
              fluid/>

              <Card.Title className="fullname mb-2">
                {userProfile?.firstName + " "}
                {userProfile?.lastName} 
              </Card.Title>

              <Card.Subtitle className="age mb-2">
                Age: {" " + userProfile?.age}
              </Card.Subtitle>

              <Card.Subtitle className="mail mb-2">
                Mail: {" " + userProfile?.email}
              </Card.Subtitle>

              <Card.Subtitle className="bio mb-2">
                Bio: {" " + userProfile?.bio}
              </Card.Subtitle>

              <Button 
              variant="button" 
              onClick={handleEdit}  
              disabled={loading}
              >
                Edit profile
              </Button>

            </Card.Body>
          </Card>
        </Col>

        <Col> 
          {/* Current listings */}
          <Card className="main-card mb-5 mt-5">
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

        {/* Pending bookings */}
          <Card className="main-card mb-5 mt-5">
            <Card.Header>Pending bookings</Card.Header>
            <Card.Body>
              <Row>
                
              </Row>
            </Card.Body>
          </Card>

      </Row>
    </Container>
  );
};

export default Profile;
