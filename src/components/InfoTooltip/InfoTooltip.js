import popupImgSuccess from '../../images/auth__popup_succes.svg';
import popupImgFailed from '../../images/auth__popup_failed.svg';
const InfoTooltip = (props) => {
    return (
        <div className={`popup popup_name_auth-status ${props.isOpen && "popup_show"}`}>
            <div className="popup__container">
                <button
                    onClick={props.onClose}
                    className="popup__close-button"
                    aria-label="Закрыть форму"
                    type="button"
                ></button>
                <img className="popup__image-status" src={props.state === true ? popupImgSuccess : popupImgFailed}></img>
                <h2 className="popup__description">{props.state === true ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
Попробуйте ещё раз.`}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip;