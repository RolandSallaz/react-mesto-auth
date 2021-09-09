import PopupWithForm from "../PopupWithForm/PopupWithForm";
export default function DeleteConfirmPopup(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(props.card);
    }
    return (<PopupWithForm
        name="DeleteConfirm"
        title="Вы уверены?"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        loading={props.loading}
    />)
}