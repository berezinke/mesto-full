import React from 'react';
import '../index.css';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupInfo from '../components/PopupInfo.js';
import ImagePopup from '../components/ImagePopup.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import exApi from '../utils/Api.js';
import {infoText, objAuth} from '../utils/Utils.js';

// использование контекста
import {CurrentUserContext} from '../context/CurrentUserContext.js';

// импорт компонентов для route
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.js';
import Login from '../components/Login';
import Register from '../components/Register';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isInfoOpen, setInfoOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({isOpen:false, cardPicture:'', cardText:''})

  const [currentUser , setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  // const promiseAuthorInfo = exApi.getAuthorInfo();
  // const promiseAllCard = exApi.getInitCards();

  const [isThinking, setIsThinking] = React.useState(false);

  // Авторизация
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [arrAuth, setArrAuth] = React.useState(objAuth.authExit);

  const history = useHistory();

  const [messageInfo, setMessageInfo] = React.useState('messageOkEnter');
  const [mailUserInfo, setMailUserInfo] = React.useState('');
          
  React.useEffect(() => {
    if (loggedIn) {
      const promiseAuthorInfo = exApi.getAuthorInfo();
      const promiseAllCard = exApi.getInitCards();

      Promise.all([promiseAuthorInfo, promiseAllCard])
      .then(([resAuthor, resAllCards]) => {
       setCurrentUser(resAuthor);
       setCards(resAllCards);
      })
      .catch((err) => {
         console.log('Ошибка. Запрос к серверу не выполнен: ', err)
      })
    }    
  }, [loggedIn]);

  React.useEffect(() => {
    if (!loggedIn) {
      handleTokenCheck(exApi);
    }
  }, []); //loggedIn*/

  // Kusto
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleUpdateUser (authorInfo) {
    setIsThinking(true);
    exApi.setAuthorInfo(authorInfo)
     .then((resAuthor) => {
      setCurrentUser(resAuthor)
      closeAllPopups()
     })
     .catch((err) => {
        console.log('Ошибка. Запрос к серверу не выполнен: ', err)
     })
     .finally(() =>{
      setIsThinking(false);
     })
  };

  // Avatar
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleUpdateAvatar (avatarInfo) {
    setIsThinking(true);
    exApi.setAuthorAvatar(avatarInfo)
     .then((resAuthor) => {
      setCurrentUser(resAuthor)
      closeAllPopups()
     })
     .catch((err) => {
        console.log('Ошибка. Запрос к серверу не выполнен: ', err)
     })
     .finally(() =>{
      setIsThinking(false);
     })
  };

  // Card
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard({isOpen:true, cardPicture:card.link, cardText:card.name});
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // setThinkingInfo(infoText.messageInfo);
    setMessageInfo('messageInfo');
    setInfoOpen(true);
    (isLiked ? exApi.putoffLikeFromCard(card._id) : exApi.putLikeToCard(card._id))    
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log('Ошибка. Запрос к серверу не выполнен: ', err)
   })
   .finally(() =>{
    setInfoOpen(false);
   });
  }
  function handleCardDelete(card) {
    // setThinkingInfo(infoText.messageInfo);
    setMessageInfo('messageInfo');
    setInfoOpen(true);
    exApi.deleteCardFromServer(card._id)    
    .then((newCard) => {
      setCards((cards) => cards.filter((c) => {return (c._id != card._id)}))
    })
    .catch((err) => {
      console.log('Ошибка. Запрос к серверу не выполнен: ', err)
   })
   .finally(() =>{
    setInfoOpen(false);
   });
  }
  function handleAddPlaceSubmit (cardInfo) {
    setIsThinking(true);
    exApi.addCardToServer(cardInfo)
     .then((resCard) => {
      setCards([resCard, ...cards]);
      closeAllPopups()
     })
     .catch((err) => {
        console.log('Ошибка. Запрос к серверу не выполнен: ', err)
     })
     .finally(() =>{
      setIsThinking(false);
     })
  };

  // Close
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({isOpen:false, cardPicture:'', cardText:''});
    setInfoOpen(false);
  }

  // Авторизация
  function handleTokenCheck(exApi) {
    if (localStorage.getItem('jwt')) {
      console.log('1');
      // console.log(localStorage.getItem('jwt'));
      exApi.userCheckToken(localStorage.getItem('jwt')).then((res) => {
        if (res) {
          setMailUserInfo(res.data.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .finally(() =>{
        if (!loggedIn) {
          setLoginPopupOpen(true);
        }
      })
    }
  }

  // Login
  function handleSubmitLogin (userEmail, userPassword) {
    exApi.userAuthorize(userEmail, userPassword)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        setMailUserInfo(userEmail);
        setLoggedIn(true);
        writeResultsAuth('messageOkEnter');
        history.push('/')            
      } 
    })
    .catch((err) => {
      setMessageInfo('messageUps');
      setInfoOpen(true);
      console.log(err)
    })
  }
  // Register
  function handleSubmitRegister (userEmail, userPassword) {
    exApi.userRegister(userEmail, userPassword)
    .then((res) => {
      if (res.statusCode !== 400) {
        history.push('/sign-in');
      }
      writeResultsAuth('messageOkReg');
      history.push('/sign-in')
    })
    
    .catch((err) => {
      setMessageInfo('messageUps');
      setInfoOpen(true);
      console.log(err)})
  }

  function writeResultsAuth (typeMessage) {
    setMessageInfo(typeMessage);
    setInfoOpen(true);
  }

  // Header
  function changeFormAuth(location) {
    let path = '/sign-in';

    if (!loggedIn) {
      if (location.pathname == '/sign-in') {
        path = '/sign-up';
        setRegisterPopupOpen(false)
      } else {
        setRegisterPopupOpen(true)        
      }
    } else {
      localStorage.removeItem('jwt');
      setMailUserInfo('');
      setLoggedIn(false);      
    }
    history.push(path)
  }

  return (
    <div className="body" style={{minHeight: `100vh`}}>
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        loggedIn = {loggedIn}
        setLoggedIn = {setLoggedIn}
        history = {history}

        arrAuth = {arrAuth}
        setArrAuth = {setArrAuth}

        mailUserInfo = {mailUserInfo}
        setMailUserInfo = {setMailUserInfo}

        setRegisterPopupOpen = {setRegisterPopupOpen}
        isRegisterPopupOpen = {isRegisterPopupOpen}

        changeFormAuth = {changeFormAuth}
      />
      <Switch>
        <ProtectedRoute exact path="/"
            component ={Main}
            cards = {cards}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onClose = {closeAllPopups}
            loggedIn = {loggedIn}            
        />
        <Route path="/sign-up">
          <Register
            exApi={exApi}
            handleLogin={setLoggedIn}
            loggedIn={loggedIn}
            handleLoginOpen={setLoginPopupOpen}
            isRegOpen = {isRegisterPopupOpen}
            change
            onClose = {closeAllPopups}
            isThinking = {isThinking}
            setLoginPopupOpen = {setRegisterPopupOpen}
            setRegisterPopupOpen = {setRegisterPopupOpen}
            isRegisterPopupOpen = {isRegisterPopupOpen}
            setInfoOpen = {setInfoOpen}
            isInfoOpen = {isInfoOpen}
            handleSubmitRegister = {handleSubmitRegister}
            messageInfo = {messageInfo}
            // setMessageInfo = {setMessageInfo}
            // mailUserInfo = {mailUserInfo}
            // setMailUserInfo = {setMailUserInfo}
            // history = {history}
            setArrAuth = {setArrAuth}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            // exApi={exApi}
            loggedIn={loggedIn}
            handleLogin={setLoggedIn}
            handleLoginOpen={setLoginPopupOpen}
            isOpen = {isLoginPopupOpen}
            onClose = {closeAllPopups}
            setLoginPopupOpen = {setLoginPopupOpen}
            setRegisterPopupOpen = {setRegisterPopupOpen}
            isRegisterPopupOpen = {isRegisterPopupOpen}
            setInfoOpen = {setInfoOpen}
            isInfoOpen = {isInfoOpen}

            handleSubmitLogin = {handleSubmitLogin}
            messageInfo = {messageInfo}
            // setMessageInfo = {setMessageInfo}
            // mailUserInfo = {mailUserInfo}
            // setMailUserInfo = {setMailUserInfo}
          />      
        </Route>
      </Switch>
      <Footer />
      

      <EditProfilePopup
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onUpdateUser = {handleUpdateUser}
        isThinking = {isThinking}>
      </EditProfilePopup>

      <AddPlacePopup 
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onAddCard = {handleAddPlaceSubmit}
        isThinking = {isThinking}> 
      </AddPlacePopup>

      <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onUpdateAvatar = {handleUpdateAvatar}
        isThinking = {isThinking}>
      </EditAvatarPopup>

      <PopupWithForm 
        title = "Вы уверены?"
        name = "avatarcardDeleteEdit"
        submit = "Да"
        onClose = {closeAllPopups}>
      </PopupWithForm>

      <PopupInfo 
        infoPop = {messageInfo}
        isOpened = {isInfoOpen}
        onClose = {closeAllPopups}>
      </PopupInfo>

      <ImagePopup 
        picture = {selectedCard.cardPicture}
        text = {selectedCard.cardText}
        isOpen = {selectedCard.isOpen}
        onClose = {closeAllPopups}>
      </ImagePopup>
    </CurrentUserContext.Provider>
    </div>
    </div>
  );
}

export default withRouter(App);

/*





*/