import {SyntheticEvent} from "react";

interface props {
    name: string,
    title: string,
    children?: JSX.Element | JSX.Element[],
    isOpen: Boolean,
    loading: Boolean,
    onClose: () => void,
    onSubmit: (e: SyntheticEvent) => void,
    buttonText?: String,
}

const PopupWithForm = ({name, title, children, isOpen, onClose, onSubmit, loading, buttonText}: props) => {

    return (
        <div className={`popup ${isOpen && "popup_show"}`}>
            <div className="popup__container">
                <button
                    onClick={onClose}
                    className="popup__close-button"
                    aria-label="Закрыть форму"
                    type="button"
                ></button>
                <form className="form" id={name} onSubmit={onSubmit}>
                    <div className="form__container">
                        <h2 className="form__title">{title}</h2>
                        {children}
                        <button className={`form__save-button ${loading && "form__save-button_loading"}`} type="submit">
                            {buttonText || 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default PopupWithForm;
