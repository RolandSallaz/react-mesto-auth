import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import DeleteConfirmPopup from "../DeleteConfirmPopup/DeleteConfirmPopup";
import api from "../../utils/Api";
import { useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardDeleteClick = (cardData) => {
    setCardToDelete(cardData);
    setIsDeletePopupOpen(true);
  }

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => { setCards((state) => state.filter(cardItem => cardItem._id !== card._id)); closeAllPopups(); })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  }

  const handleUpdateUser = ({ name, about, test }) => {
    setIsLoading(true);
    api
      .setUserInfo(name, about)
      .then(res => { setCurrentUser(res); closeAllPopups() })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }
  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .changerAvatar(avatar)
      .then(res => { setCurrentUser(res); closeAllPopups() })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked ? "DELETE" : "PUT")
      .then((newCard) => { setCards((state) => state.map((c) => c._id === card._id ? newCard : c)); })
      .catch(err => console.log(err));
  }

  const handleAddPlace = ({ link, description }) => {
    setIsLoading(true);
    api
      .sendCard(description, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
  };
  useEffect(() => {
    api
      .getUserInfo().then(res => { setCurrentUser(res); })
      .catch(err => console.log(`Ошибка при загрузке пользователя err ${err}`));
  }, []);
  useEffect(() => {
    api
      .getCards().then(cardList => { setCards(cardList); })
      .catch(err => console.log(`Ошибка при получении карточек err ${err}`));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        {currentUser && <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
        />}
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} loading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlace} loading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} loading={isLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <DeleteConfirmPopup isOpen={isDeletePopupOpen} card={cardToDelete} onClose={closeAllPopups} onSubmit={handleCardDelete} loading={isLoading} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
