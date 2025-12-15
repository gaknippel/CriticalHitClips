import './Footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-links">
                <a href="https://github.com/gaknippel" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.youtube.com/@CriticalHitClipstf2" target="_blank" rel="noopener noreferrer">YouTube</a>
                <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
            <div className="footer-copyright">
                © 2025 Greyson Knippel
            </div>
        </footer>
    );
};

export default Footer;