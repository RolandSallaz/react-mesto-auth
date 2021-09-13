import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../Header/Header";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSumbmit = (e) => {
        e.preventDefault();
        props.onSubmit({ email, pass });
    }
    return (
        <>
            <Header>
                <Link to="/sign-up" className='nav-menu__link'>Регистрация</Link>
            </Header>
            <div className="auth">
                <form id='form-auth' onSubmit={handleSumbmit}>
                    <h2 className="form-auth__heading">Вход</h2>
                    <label>
                        <input placeholder="Email" value={email} className="form-auth__input" type="email" onChange={({ target }) => { setEmail(target.value) }} required />
                    </label>
                    <label>
                        <input placeholder="Пароль" value={pass} className="form-auth__input" type="password" onChange={({ target }) => { setPass(target.value) }} required />
                    </label>
                    <button className="form-auth__submit-button" type="submit">Войти</button>
                </form>
            </div >
        </>
    )
}
export default Login;