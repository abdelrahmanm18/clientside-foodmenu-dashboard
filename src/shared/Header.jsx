// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../../style/Header.css';
import logo from '../assets/logo.jpg';
// import { Link } from 'react-router-dom';

const Header = () => {
  const clickHandler = function () {};
  return (
    <>
      <header>
        <div className='container'>
          <Link to={'/'} className='logo-container'>
            <img
              src={logo}
              alt='logo'
              className='logo'
              onClick={clickHandler}
            ></img>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
