import Card from '../Card/Card.js';
import Header from '../Header/Header.js';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards, ...props }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <Header>
        <p className="nav-menu__user-email">{props.userEmail}</p> <Link to="/sign-in" onClick={props.onLogOut} className='nav-menu__link'>Выйти</Link>
      </Header>
      <main className="content">
        <section className="profile">
          <button className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser?.avatar})` }} >
            <div className="profile__edit"></div>
          </button>
          <div className="profile__info">
            <div className="profile__content">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <p className="profile__subtitle">{currentUser?.about}</p>
            </div>
            <button
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <button
            className="profile__add-button"
            aria-label="Добавить карточку"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements">
          {cards.map(cardItem => {
            return (<Card
              key={cardItem._id}
              cardData={cardItem}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />)
          })}
        </section>
      </main>
    </>
  );
};
export default Main;
