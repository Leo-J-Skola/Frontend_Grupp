import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import Listing from "./pages/Listing";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomiHeader from "./components/MyHeader";
import Footer from "./components/Footer";
import ListingPage from "./pages/ListingPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <header><HomiHeader></HomiHeader></header>
            <div className="app">
              <main className="main-content">
                <Routes>
                  {/* public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
      
                  {/* protected routes for all authenticated users */}
                  <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/listing" element={<Listing />} />
                    <Route path="/listing/:id" element={<ListingPage />} />
                  </Route>
      
                  {/* protected routes for admins only */}
                  <Route element={<ProtectedRoute requiredRoles={["ADMIN"]} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                  </Route>
                </Routes>
              </main>
            </div>
          <Footer/>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
