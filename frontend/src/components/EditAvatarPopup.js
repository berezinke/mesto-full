import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import {CurrentUserContext} from '../context/CurrentUserContext.js';

function EditAvatarPopup (props) {
  const resAuthor = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({newAvatar: avatarRef.current.value});
  }

  return (    
    <PopupWithForm 
      title = "Редактировать аватар"
      name = "profileEdit"
      submit = "Сохранить"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      isThinking = {props.isThinking}>
        <input type="url" 
                 className="profile-change__input" 
                 name="picturePl" id="avatarEditPop" 
                 placeholder="Адрес картинки" 
                 ref={avatarRef} 
                 defaultValue = {resAuthor.avatar || ''}
                 required/>
        <span className="profile-change__error" id="avatarEditPop-error">Ок</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;