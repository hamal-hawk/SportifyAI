import {Link} from 'react-router-dom';
import Search from './Search';

export default function Navbar({loggedIn, setLoggedIn, setUser, user}){

    function logoutHandle(){
        setLoggedIn(false);
        setUser('');
    }
    return (
        <div className="navbar">
            <h1> The blog. </h1>
            {loggedIn && <Search/>}
            <div className="links">
            {loggedIn && <Link to="/home"> Home </Link>}
            {loggedIn && <Link to="/create"> Create Blog </Link>}
            {loggedIn && <Link to="/" onClick={logoutHandle}> Logout </Link>}
            {!loggedIn && <Link to="/signup"> Signup </Link>}
            {loggedIn && user.id === 'admin' && <Link to="/users"> Users </Link>}
            </div>
        </div>
    )
}
