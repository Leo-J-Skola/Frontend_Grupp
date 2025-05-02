import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from "./components/MyNavbar";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <main className="main-content">
              <TopNavbar>
            <Routes>
              {/* public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* protected routes for all authenticated users */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/user" element={<User />} /> */}
              </Route>

              {/* protected routes for admins only */}
              <Route element={<ProtectedRoute requiredRoles={["ADMIN"]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
            </TopNavbar>
          </main>
        </div>
        
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
