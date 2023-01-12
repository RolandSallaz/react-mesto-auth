import {SyntheticEvent, useRef} from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

interface props {
    onUpdateAvatar: ({avatar}: { avatar: string }) => void,
    isOpen: Boolean,
    onClose: () => void,
    loading: Boolean,
}

export default function EditAvatarPopup({onUpdateAvatar, isOpen, onClose, loading}: props) {
    const avatarRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!avatarRef.current?.value) return;
        onUpdateAvatar({avatar: avatarRef.current?.value});
    }
    return (
        <PopupWithForm
            name="changeAvatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loading={loading}
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
        </PopupWithForm>
    );
}