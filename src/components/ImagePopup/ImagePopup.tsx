import {ICard} from "../../utils/Interfaces";

interface props {
    card: ICard | null,
    onClose: () => void,
}

const ImagePopup = ({card, onClose}: props) => {
    return (
        <div className={`popup popup_name_image ${card && 'popup_show'}`}>
            <div className="popup__container popup__container_name_preview">
                <button
                    onClick={onClose}
                    className="popup__close-button"
                    aria-label="Закрыть форму"
                    type="button"
                ></button>
                <img src={card?.link} alt={card?.name} className="popup__image"></img>
                <p className="popup__image-name">{card?.name}</p>
            </div>
        </div>
    );
};
export default ImagePopup;
