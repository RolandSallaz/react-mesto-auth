import { Route, Switch, useHistory } from "react-router";
import { useState, useEffect } from "react";
import api from "../../utils/Api";
import apiAuth from "../../utils/ApiAuth";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";

import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import DeleteConfirmPopup from "../DeleteConfirmPopup/DeleteConfirmPopup";
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState(null);
  const [authMessage, setAuthMessage] = useState('');
  const [cards, setCards] = useState([]);

  const history = useHistory();

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
      .then(res => { setCurrentUser(res); closeAllPopups(); console.log(currentUser) })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
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
      .finally(() => {
        setIsLoading(false)
      });
  }

  const handleRegistration = ({ email, pass }) => {
    apiAuth
      .newUser({ email, pass })
      .then(() => {
        setAuthState(true);
        setAuthMessage('Вы успешно зарегистрировались!');
        history.push('/sign-in');
      })
      .catch(() => {
        setAuthState(false)
        setAuthMessage(`Что-то пошло не так!
        Попробуйте ещё раз.`);
      })
      .finally(() => {
        setIsInfoPopupOpen(true)
      });
  }
  const handleLogin = ({ email, pass }) => {
    apiAuth
      .loginIn({ email, pass }).then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/');
        setUserEmail(email);
      })
      .catch((err) => { console.log(err); setIsInfoPopupOpen(true); setAuthState(false); setAuthMessage('Неверный логин или пароль') });
  }
  const handleLogOut = () => {
    document.cookie = "jwt=";
    setLoggedIn(false);
    history.push('/sign-in');
  }
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard(null);
    setAuthState(null);
    setAuthMessage('');
  };
  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setLoggedIn(true);
        history.push('/');
        setUserEmail(res.user.email);
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          history.push('/sign-in');
        }

      });
  }, [history]);
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo().then(res => { setCurrentUser(res); })
        .catch(err => console.log(`Ошибка при загрузке пользователя err ${err}`));
      api
        .getCards().then(cardList => { setCards(cardList); })
        .catch(err => console.log(`Ошибка при получении карточек err ${err}`));
    }
  }, [loggedIn]);

  return (
    <Switch>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <ProtectedRoute
            userEmail={userEmail}
            component={Main}
            onLogOut={handleLogOut}
            loggedIn={loggedIn} path='/'
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}>
          </ProtectedRoute>
          <Route exact path='/sign-in'>
            <Login onSubmit={handleLogin} />
          </Route>
          <Route exact path='/sign-up'>
            <Register onSubmit={handleRegistration} />
          </Route>
          <Footer />
          <InfoTooltip isOpen={isInfoPopupOpen} onClose={closeAllPopups} state={authState} message={authMessage} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} loading={isLoading} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlace} loading={isLoading} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} loading={isLoading} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <DeleteConfirmPopup isOpen={isDeletePopupOpen} card={cardToDelete} onClose={closeAllPopups} onSubmit={handleCardDelete} loading={isLoading} />
        </div>
      </CurrentUserContext.Provider>
    </Switch>
  );
}

export default App;
