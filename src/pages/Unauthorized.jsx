import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <h1>Access Denied</h1>
      <p>You don't have permission to view this page.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Unauthorized;
