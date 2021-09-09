import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
export default function EditAvatarPopup(props) {
    const avatarRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateAvatar({ avatar: avatarRef.current.value });
    }
    return (<PopupWithForm
        name="changeAvatar"
        title="Обновить аватар"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        loading={props.loading}
    >
        <label>
            <input
                placeholder="Ссылка на картинку"
                type="url"
                name="link"
                className="form__input form__input_info_about"
                id="form__input_changeAvatar_link"
                required
                ref={avatarRef}
            />
            <span
                className="form__error"
                id="form__input_changeAvatar_link-error"
            >
                Поле с ошибкой
            </span>
        </label>
    </PopupWithForm>);
}