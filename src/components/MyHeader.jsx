import { useAuth } from '../hooks/useAuth';
import TopNavbarUser from './NavbarUser';
import TopNavbarGuest from './NavbarGuest';

function HomiHeader(){


const {currentUser, logout} = useAuth();

const isAdmin =
     currentUser && currentUser.roles && currentUser.roles.includes("ADMIN");
  
const isUser =
    currentUser && currentUser.roles && currentUser.roles.includes("USER");


return isUser ? <TopNavbarUser/> : <TopNavbarGuest/>;





}

export default HomiHeader;
