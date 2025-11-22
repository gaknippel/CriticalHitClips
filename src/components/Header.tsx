import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/submit">Submit</Link>
        <Link to="/support">Support</Link>
      </nav>
    </header>
  );
};

export default Header;
