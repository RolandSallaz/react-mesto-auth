import popupImgSuccess from '../../images/auth__popup_succes.svg';
import popupImgFailed from '../../images/auth__popup_failed.svg';
const InfoTooltip = (props) => {
    return (
        <div className={`popup ${props.isOpen && "popup_show"}`}>
            <div className="popup__container">
                <button
                    onClick={props.onClose}
                    className="popup__close-button"
                    aria-label="Закрыть форму"
                    type="button"
                ></button>
                <img className="popup__image-status" alt="Статус аутентификации" src={props.state === true ? popupImgSuccess : popupImgFailed}></img>
                <h2 className="popup__description">{props.message}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip;