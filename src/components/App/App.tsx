import { Route, Routes, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import api from '../../utils/Api'
import { apiAuth, IAuthReq } from '../../utils/ApiAuth'

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Login from '../Login/Login'
import Register from '../Register/Register'

import AddPlacePopup from '../AddPlacePopup/AddPlacePopup'
import ImagePopup from '../ImagePopup/ImagePopup'
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup'
import DeleteConfirmPopup from '../DeleteConfirmPopup/DeleteConfirmPopup'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { IUser, ICard, IUserInfo, IPlace } from '../../utils/Interfaces'

type InfoToolTip = {
  opened: boolean
  message: string
  status: boolean | null
}

function App() {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false)
  const [userEmail, setUserEmail] = useState<String>('')
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const [infoToolTipPopupState, setInfoToolTipPopupState] = useState<
    InfoToolTip
  >({ opened: false, message: '', status: null })
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState<Boolean>(
    false,
  )
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState<Boolean>(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState<Boolean>(
    false,
  )
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<Boolean>(false)
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null)
  const [cardToDelete, setCardToDelete] = useState<ICard | null>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [cards, setCards] = useState<ICard[]>([])

  const navigate = useNavigate()

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardDeleteClick = (cardData: ICard) => {
    setCardToDelete(cardData)
    setIsDeletePopupOpen(true)
  }

  const handleCardDelete = (card: ICard) => {
    setIsLoading(true)
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((cardItem) => cardItem._id !== card._id),
        )
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  const handleCardClick = (cardData: ICard) => {
    setSelectedCard(cardData)
  }

  const handleUpdateUser = ({ name, about }: IUserInfo) => {
    setIsLoading(true)
    api
      .setUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }
  const handleUpdateAvatar = ({ avatar }: { avatar: String }) => {
    setIsLoading(true)
    api
      .changerAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  const handleCardLike = (card: ICard) => {
    const isLiked = card.likes.some((user) => user._id === currentUser?._id)
    api
      .changeLikeCardStatus(card._id, isLiked ? 'DELETE' : 'PUT')
      .then((newCard: ICard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        )
      })
      .catch(console.log)
  }

  const handleAddPlace = ({ link, name }: IPlace) => {
    setIsLoading(true)
    api
      .sendCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  const handleRegistration = ({ email, password }: IAuthReq) => {
    apiAuth
      .newUser({ email, password })
      .then(() => {
        setInfoToolTipPopupState({
          opened: true,
          message: 'Вы успешно зарегистрировались!',
          status: true,
        })
        navigate('/sign-in')
      })
      .catch(() => {
        setInfoToolTipPopupState({
          opened: true,
          message: `Что-то пошло не так!
        Попробуйте ещё раз.`,
          status: false,
        })
      })
  }

  const handleLogin = ({ email, password }: IAuthReq) => {
    apiAuth
      .loginIn({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/')
        setUserEmail(email)
      })
      .catch(() =>
        setInfoToolTipPopupState({
          opened: true,
          message: `Неверный логин или пароль`,
          status: false,
        }),
      )
  }
  const handleLogOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    navigate('/sign-in')
  }
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsDeletePopupOpen(false)
    setSelectedCard(null)
    setInfoToolTipPopupState({ opened: false, message: '', status: null })
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      apiAuth
        .getUser(token)
        .then((res) => {
          setLoggedIn(true)
          navigate('/')
          setUserEmail(res.data.email)
        })
        .catch(() => navigate('/sign-in'))
    }
  }, [navigate])

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then(setCurrentUser)
        .catch((err) =>
          console.log(`Ошибка при загрузке пользователя err ${err}`),
        )
      api
        .getCards()
        .then(setCards)
        .catch((err) => console.log(`Ошибка при получении карточек err ${err}`))
    }
  }, [loggedIn])

  return (
    
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  userEmail={userEmail}
                  onLogOut={handleLogOut}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<Login onSubmit={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onSubmit={handleRegistration} />}
          />
          </Routes>
          <Footer />
          <InfoTooltip
            state = { infoToolTipPopupState}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            loading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlace}
            loading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            loading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <DeleteConfirmPopup
            isOpen={isDeletePopupOpen}
            card={cardToDelete}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            loading={isLoading}
          />
        </div>
      </CurrentUserContext.Provider>
    
  )
}

export default App
