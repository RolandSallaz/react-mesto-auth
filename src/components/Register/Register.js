import { Link } from "react-router-dom";
import { useState } from "react";
import Header from '../Header/Header'

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({ email, pass });
    }

    return (
        <>
            <Header>
                <Link to="/sign-in" className='nav-menu__link'>Войти</Link>
            </Header>
            <div className="auth">
                <form id='form-auth' onSubmit={handleSubmit}>
                    <h2 className="form-auth__heading">Регистрация</h2>
                    <label>
                        <input placeholder="Email" value={email} className="form-auth__input" type="email" required onChange={({ target }) => setEmail(target.value)} />
                    </label>
                    <label>
                        <input placeholder="Пароль" value={pass} className="form-auth__input" type="password" required onChange={({ target }) => setPass(target.value)} minLength="8" />
                    </label>
                    <button className="form-auth__submit-button" type="submit">Зарегистрироваться</button>
                </form>
                <p className='auth__description'>Уже зарегистрированы? <Link className="auth__description_link" to='/sign-in'>Войти</Link></p>
            </div >

        </>
    )
}
export default Register;