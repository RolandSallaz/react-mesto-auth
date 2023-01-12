import {Link} from "react-router-dom";
import {SyntheticEvent, useState, ChangeEvent} from "react";
import Header from "../Header/Header";
import {IAuthReq} from "../../utils/ApiAuth";

interface props {
    onSubmit: ({email, password}: IAuthReq) => void,
}

const Login = ({onSubmit}: props) => {
    const [inputData, setIntputData] = useState<{ email: string, password: string }>({
        email: '',
        password: '',
    })
    const {email, password} = inputData;
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        onSubmit({email, password});
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        setIntputData({...inputData, [name]: value})
    }

    return (
        <>
            <Header>
                <Link to="/sign-up" className='nav-menu__link'>Регистрация</Link>
            </Header>
            <div className="auth">
                <form id='form-auth' onSubmit={handleSubmit}>
                    <h2 className="form-auth__heading">Вход</h2>
                    <label>
                        <input placeholder="Email" value={email} name='email' className="form-auth__input" type="email"
                               onChange={handleInputChange} required/>
                    </label>
                    <label>
                        <input placeholder="Пароль" value={password} name='password' className="form-auth__input"
                               type="password"
                               onChange={handleInputChange} required/>
                    </label>
                    <button className="form-auth__submit-button" type="submit">Войти</button>
                </form>
            </div>
        </>
    )
}
export default Login;