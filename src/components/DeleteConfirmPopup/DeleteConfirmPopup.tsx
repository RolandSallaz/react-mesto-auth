import {SyntheticEvent} from "react";
import {ICard} from "../../utils/Interfaces";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

interface props {
    card: ICard | null,
    loading: Boolean,
    onClose: () => void,
    onSubmit: (arg: ICard) => void,
    isOpen: Boolean
}

export default function DeleteConfirmPopup({card, loading, onClose, onSubmit, isOpen}: props) {
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!card) return;
        onSubmit(card);
    }
    return (
        <PopupWithForm
            name="DeleteConfirm"
            title="Вы уверены?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loading={loading}
        />)
}