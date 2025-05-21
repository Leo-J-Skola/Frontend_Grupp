import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';

const Profile = () => {
  const { userProfile, updateProfile, loading, error, setError } = useUser();

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    };

    const handleCancel = () => {
      setFormData({
        profilePic: userProfile?.profilePic || "",
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

    const handleSubmit = async () => {
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

  if (isEditing) {
    <Container className="edit-profile mb-5">
      <Title>Edit Profile</Title>

      <Form.Group>
        <Label>Profile Picture:</Label>
        <Input 
        type="text" 
        name="profilePic" 
        value={formData.profilePic} 
        disabled={loading} 
        onChange={handleInputChange}
        />
        </Form.Group>

      <Form.Group>
        <Label>First Name:</Label>
        <Input 
        type="text" 
        name="firstName" 
        value={formData.firstName} 
        disabled={loading} 
        onChange={handleInputChange}
        />
        </Form.Group>

        <Form.Group>
        <Label>Last Name:</Label>
        <Input 
        type="text" 
        name="lastName" 
        value={formData.lastName} 
        disabled={loading} 
        onChange={handleInputChange}
        />
        </Form.Group>

        <Form.Group>
        <Label>Email:</Label>
        <Input 
        type="email" 
        name="email" 
        value={formData.email} 
        disabled={loading} 
        onChange={handleInputChange}
        />
        </Form.Group>

        <Form.Group>
        <Label>Age:</Label>
        <Input 
        type="number" 
        name="age" 
        value={formData.age} 
        disabled={loading} 
        onChange={handleInputChange}
        />
        </Form.Group>

        <Form.Group>
        <Label>Bio:</Label>
        <Input 
        type="text" 
        name="bio" 
        value={formData.bio} 
        disabled={loading} 
        onChange={handleInputChange}
        />
        </Form.Group>

        <SaveButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </SaveButton>

        <CancelButton type="button" onClick={handleCancel} disabled={loading}>
          Cancel
        </CancelButton>

    </Container>
  };

  return (
    <Container className="profile-page mb-5">
      <Row>
        {/* profile information */}
        <Col>
          <Card className="profile-card text-center">
            <Card.Body>
              <Card.Header>Your profile</Card.Header>

              <Image 
              src={"https://openclipart.org/image/2000px/247319" }
              roundedCircle 
              fluid/>

              <Card.Title className="fullname mb-2">
                {userProfile.firstName + " " }{ userProfile.lastName} 
              </Card.Title>

              <Card.Subtitle className="age mb-2">
                Age: {" " + userProfile.age}
              </Card.Subtitle>

              <Card.Subtitle className="mail mb-2">
                Mail: {" " + userProfile.email}
              </Card.Subtitle>

              <Card.Subtitle className="phone mb-2">
                Phone: {" " + userProfile.phone}
              </Card.Subtitle>

              <Card.Subtitle className="mb-2">
                Bio: {" " + userProfile.bio}
              </Card.Subtitle>

              <Button 
              variant="button" 
              onClick={handleEdit} 
              text="Edit profile" 
              disabled={loading}
              />

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
      </Row>
    </Container>
  );
};

export default Profile;
