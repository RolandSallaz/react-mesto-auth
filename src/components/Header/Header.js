import "./Header";
import logo from "../../images/logo.svg";

const Header = (props) => {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип 'Яндекс место'"
        className="logo logo_place_header"
      />
      <nav className="nav-menu">
        {props.children}
      </nav>
    </header>
  );
};
export default Header;
