import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <div className="user-info">
        <h2>Account Information</h2>
        <p>
          <strong>Username:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Role:</strong> {currentUser.roles.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Profile;
