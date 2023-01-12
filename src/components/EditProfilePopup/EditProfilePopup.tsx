import {useEffect, useState, useContext, SyntheticEvent, ChangeEvent} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {IUserInfo} from "../../utils/Interfaces";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

interface props {
    isOpen: Boolean
    onClose: () => void
    onUpdateUser: ({about, name}: IUserInfo) => void
    loading: Boolean
}

function EditProfilePopup({isOpen, onClose, onUpdateUser, loading}: props) {
    const [inputData, setIntputData] = useState<{ name: string, about: string }>({
        name: '',
        about: '',
    })
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (!currentUser) return;
        const {name, about} = currentUser;
        setIntputData({name, about})
    }, [currentUser, isOpen]);

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const {name, about} = inputData
        onUpdateUser({
            name,
            about,
        });
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        setIntputData({...inputData, [name]: value})
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loading={loading}
        >
            <label>
                <input
                    placeholder="Имя"
                    value={inputData.name}
                    type="text"
                    name="name"
                    className="form__input form__input_info_name"
                    id="form__input_info_name"
                    required
                    minLength={2}
                    maxLength={40}
                    onChange={handleInputChange}
                />
                <span className="form__error" id="form__input_info_name-error">
                Поле с ошибкой
            </span>
            </label>
            <label>
                <input
                    placeholder="О себе"
                    value={inputData.about}
                    type="text"
                    name="about"
                    className="form__input form__input_info_about"
                    id="form__input_info_about"
                    required
                    minLength={2}
                    maxLength={200}
                    onChange={handleInputChange}
                />
                <span className="form__error" id="form__input_info_about-error">
                Поле с ошибкой
            </span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;