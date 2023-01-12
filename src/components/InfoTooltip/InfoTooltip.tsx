import popupImgSuccess from '../../images/auth__popup_succes.svg'
import popupImgFailed from '../../images/auth__popup_failed.svg'

interface props {
    onClose: () => void,
    state: { opened: Boolean, message: String, status: Boolean | null }
}

const InfoTooltip = ({state, onClose}: props) => {
    return (
        <div className={`popup ${state?.message && 'popup_show'}`}>
            <div className="popup__container">
                <button
                    onClick={onClose}
                    className="popup__close-button"
                    aria-label="Закрыть форму"
                    type="button"
                ></button>
                <img
                    className="popup__image-status"
                    alt="Статус аутентификации"
                    src={state?.status ? popupImgSuccess : popupImgFailed}
                ></img>
                <h2 className="popup__description">{state?.message}</h2>
            </div>
        </div>
    )
}
export default InfoTooltip
