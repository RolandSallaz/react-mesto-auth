import PopupWithForm from '../PopupWithForm/PopupWithForm'
import {ChangeEvent, SyntheticEvent, useState} from 'react'
import {IPlace} from '../../utils/Interfaces'

interface props {
    isOpen: Boolean
    onClose: () => void
    onSubmit: ({link, name}: IPlace) => void
    loading: Boolean
}

export default function AddPlacePopup({
                                          isOpen,
                                          onClose,
                                          onSubmit,
                                          loading,
                                      }: props) {
    const [inputData, setIntputData] = useState<{ name: string, link: string }>({
        name: '',
        link: '',
    })

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        onSubmit({link: inputData.link, name: inputData.name})
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target
        setIntputData({...inputData, [name]: value})
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое Место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loading={loading}
        >
            <label>
                <input
                    placeholder="Название"
                    type="text"
                    name="name"
                    className="form__input form__input_info_name"
                    id="form__input_info_cardName"
                    required
                    value={inputData.name}
                    onChange={handleInputChange}
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
                    value={inputData.link}
                    onChange={handleInputChange}
                />
                <span className="form__error" id="form__input_info_link-error">
          Поле с ошибкой
        </span>
            </label>
        </PopupWithForm>
    )
}
