import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
function EditProfilePopup(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);
    return (<PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        loading={props.loading}
    >
        <label>
            <input
                placeholder="Имя"
                value={name}
                type="text"
                name="userName"
                className="form__input form__input_info_name"
                id="form__input_info_name"
                required
                minLength="2"
                maxLength="40"
                onChange={(e) => { setName(e.target.value) }}
            />
            <span className="form__error" id="form__input_info_name-error">
                Поле с ошибкой
            </span>
        </label>
        <label>
            <input
                placeholder="О себе"
                value={description}
                type="text"
                name="about"
                className="form__input form__input_info_about"
                id="form__input_info_about"
                required
                minLength="2"
                maxLength="200"
                onChange={(e) => { setDescription(e.target.value) }}
            />
            <span className="form__error" id="form__input_info_about-error">
                Поле с ошибкой
            </span>
        </label>
    </PopupWithForm>);
}
export default EditProfilePopup;