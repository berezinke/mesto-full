import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import {CurrentUserContext} from '../context/CurrentUserContext.js';

function AddPlacePopup (props) {
  const resAuthor = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({newName: name, newLink: link});
  }
  
  function clearFormCard() {
    setName('');
    setLink('');
  }

  function closePopAddCard () {
    props.onClose()
  }

  React.useEffect(() => {
    return () => {
      if (props.isOpen) {
        clearFormCard()
      }
    }
  }, [props.isOpen])

  return (    
    <PopupWithForm 
    title = "Новое место"
    name = "cardAdd"
    submit = "Создать"
    isOpen = {props.isOpen}
    onClose = {closePopAddCard}
    onSubmit = {handleSubmit}
    isThinking = {props.isThinking}>
      <input type="text" 
             className="profile-change__input" 
             name="namePl" id="namePicNew" 
             placeholder="Название места" 
             value = {name}
             onChange={handleChangeName}
             minLength="2" maxLength="30" 
             required/>
      <span className="profile-change__error" id="namePicNew-error">Ок</span>
      <input type="url" 
             className="profile-change__input" 
             name="picturePl" id="placePicNew" 
             value = {link}
             onChange={handleChangeLink}
             placeholder="Адрес картинки" required/>
      <span className="profile-change__error" id="placePicNew-error">Ок</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;