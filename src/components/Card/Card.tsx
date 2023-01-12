import {useContext} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {ICard} from "../../utils/Interfaces";

interface props {
    cardData: ICard,
    onCardClick: (arg: ICard) => void,
    onCardLike: (arg: ICard) => void,
    onCardDelete: (arg: ICard) => void,
}

const Card = ({cardData, onCardClick, onCardDelete, onCardLike}: props) => {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = cardData.owner._id !== currentUser?._id;
    const cardDeleteButtonClassName = (`element__deleteButton ${isOwn && 'element__deleteButton_hidden'}`);
    const isLiked = cardData.likes.some(user => user._id === currentUser?._id);
    const cardLikeButtonClassName = `element__like ${(isLiked && "element__like_clicked")}`;

    const handleCardClick = () => {
        onCardClick(cardData);
    }
    const handleCardLike = () => {
        onCardLike(cardData);
    }
    const handleCardDelete = () => {
        onCardDelete(cardData);
    }
    return (
        <div className="element">
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
            <img src={cardData.link} alt={cardData.name} className="element__image" onClick={handleCardClick}/>
            <div className="element__container">
                <h2 className="element__heading">{cardData.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} aria-label="Поставить лайк карточке" type="button"
                            onClick={handleCardLike}></button>
                    <p className="element__like-counter">{cardData.likes.length}</p>
                </div>
            </div>
        </div>);
}
export default Card;