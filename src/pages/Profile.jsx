import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useState } from 'react';
import { useUser } from '../hooks/useUser';

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
        console.log("Profile update failed " + error);
      }
    };

    if (isEditing) {
      return (
        <Container className="profile-page mb-5">
      <Row>
        {/* profile information */}
        <Col>
          <Card className="profile-card text-center">
            <Card.Body>
              <Card.Header>Your profile</Card.Header>
              <Image 
              src="https://openclipart.org/image/2000px/247319" 
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
                <Button variant="edit" onClick={handleEdit} text="Edit profile" disabled={loading}/>
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

  return (
   <Container className="profile-page mb-5">
      <Row>
        {/* profile information */}
        <Col>
          <Card className="profile-card text-center">
            <Card.Body>
              <Card.Header>Your profile</Card.Header>
              <Image 
              src="https://openclipart.org/image/2000px/247319" 
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
                <Button variant="edit" onClick={handleEdit} text="Edit profile" disabled={loading}/>
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
