import "./Header";
import logo from "../../images/logo.svg";
const Header = () => {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип 'Яндекс место'"
        className="logo logo_place_header"
      />
    </header>
  );
};
export default Header;
