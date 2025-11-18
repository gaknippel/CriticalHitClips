import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-links">
                <a href="https://github.com/gaknippel" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://youtube.com/@critterfarts" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="/privacy-policy">Privacy Policy</a>
            </div>
            <div className="footer-copyright">
                © 2025 Greyson Knippel
            </div>
        </footer>
    );
};

export default Footer;