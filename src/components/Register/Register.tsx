import {Link} from "react-router-dom";
import {useState, SyntheticEvent, ChangeEvent} from "react";
import Header from '../Header/Header'
import {IAuthReq} from "../../utils/ApiAuth";

interface props {
    onSubmit: ({email, password}: IAuthReq) => void,
}

function Register({onSubmit}: props) {
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
                <Link to="/sign-in" className='nav-menu__link'>Войти</Link>
            </Header>
            <div className="auth">
                <form id='form-auth' onSubmit={handleSubmit}>
                    <h2 className="form-auth__heading">Регистрация</h2>
                    <label>
                        <input placeholder="Email" value={email} name='email' className="form-auth__input" type="email"
                               required
                               onChange={handleInputChange}/>
                    </label>
                    <label>
                        <input placeholder="Пароль" value={password} name='password' className="form-auth__input"
                               type="password"
                               required onChange={handleInputChange} minLength={8}/>
                    </label>
                    <button className="form-auth__submit-button" type="submit">Зарегистрироваться</button>
                </form>
                <p className='auth__description'>Уже зарегистрированы? <Link className="auth__description_link"
                                                                             to='/sign-in'>Войти</Link></p>
            </div>
        </>
    )
}

export default Register;