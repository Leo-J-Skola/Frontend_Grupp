import { Link } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar'
import { useAuth } from '../hooks/useAuth';



const Header = () => {

const {currentUser, login} = useAuth();

const isAdmin =
   currentUser && currentUser.roles && currentUser.roles.includes("ADMIN");


return(
     <header className='header'>
        <MyNavbar></MyNavbar>

<nav className='navigation'>
    <Link to="/"></Link> 
</nav>
</header>
);
}


export default Header;

