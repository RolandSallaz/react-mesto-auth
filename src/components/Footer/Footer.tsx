const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy;{` ${year} Roland`}</p>
        </footer>
    );
};
export default Footer;
