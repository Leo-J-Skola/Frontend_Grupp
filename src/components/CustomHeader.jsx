import { Link } from 'react-router-dom';
import MyNavbar from './MyNavbar'
import { useAuth } from '../hooks/useAuth';
import User from '../pages/User';



const Header = () => {

const {currentUser, logout} = useAuth();

const handleLogout = async() => {
   await logout();
}

const isAdmin =
   currentUser && currentUser.roles && currentUser.roles.includes("ADMIN");

const isUser =
   currentUser && currentUser.roles && currentUser.roles.includes("USER");




return(
     <header className='header'>
        <MyNavbar></MyNavbar>
<nav className='navigation'>
    <Link to="/user"></Link> 
</nav>
<div className='auth-controls'>
   {isAdmin && (
      <Link className='link' to="/admin">
         <p className='admin'>Dashboard</p>
      </Link>
   )}

   {currentUser ? (
      <>
      {isUser &&(
         <Link className='link' to="/profile">
            <User />
         </Link>
      )}
      <button className='logout' onClick={handleLogout}>Logout</button>
      </>
   ) : (
      <>
      <Link className='link' to="/login"></Link>
      </>
   ) }
</div>
</header>
);
};


export default Header;

