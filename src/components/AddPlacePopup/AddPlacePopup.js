import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useState } from "react";
export default function AddPlacePopup({ isOpen, onClose, onSubmit, ...props }) {
    const [cardDescription, setCardDescription] = useState(null);
    const [cardLink, setCardLink] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ link: cardLink, description: cardDescription });
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое Место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loading={props.loading}
        >
            <label>
                <input
                    placeholder="Название"
                    type="text"
                    name="imgName"
                    className="form__input form__input_info_name"
                    id="form__input_info_cardName"
                    required
                    value={cardDescription}
                    onChange={e => { setCardDescription(e.target.value) }}
                />
                <span className="form__error" id="form__input_info_cardName-error">
                    Поле с ошибкой
                </span>
            </label>
            <label>
                <input
                    placeholder="Ссылка на картинку"
                    type="url"
                    name="link"
                    className="form__input form__input_info_about"
                    id="form__input_info_link"
                    required
                    value={cardLink}
                    onChange={e => { setCardLink(e.target.value) }}
                />
                <span className="form__error" id="form__input_info_link-error">
                    Поле с ошибкой
                </span>
            </label>
        </PopupWithForm>
    );
}