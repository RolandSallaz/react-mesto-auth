import "./Header";

import logo from '../../images/logo.svg'

interface props {
    children?: JSX.Element | JSX.Element[]
}

function Header({children}: props) {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип 'Яндекс место'"
                className="logo logo_place_header"
            />
            <nav className="nav-menu">
                {children}
            </nav>
        </header>
    );
};
export default Header;
