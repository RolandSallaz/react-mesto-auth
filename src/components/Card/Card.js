import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
const Card = (props) => {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.cardData.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__deleteButton ${!isOwn && 'element__deleteButton_hidden'}`
    );
    const isLiked = props.cardData.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked && "element__like_clicked"}`;
    const handleCardClick = () => {
        props.onCardClick(props.cardData);
    }
    const handleCardLike = () => {
        props.onCardLike(props.cardData);
    }
    const handleCardDelete = () => {
        props.onCardDelete(props.cardData);
    }
    return (
        <div className="element">
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
            <img src={props.cardData.link} alt={props.cardData.name} className="element__image" onClick={handleCardClick} />
            <div className="element__container">
                <h2 className="element__heading">{props.cardData.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} aria-label="Поставить лайк карточке" type="button" onClick={handleCardLike}></button>
                    <p className="element__like-counter">{props.cardData.likes.length}</p>
                </div>
            </div>
        </div>);
}
export default Card;