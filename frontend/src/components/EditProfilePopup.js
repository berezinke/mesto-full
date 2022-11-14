import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import {CurrentUserContext} from '../context/CurrentUserContext.js';

function EditProfilePopup (props) {
  const resAuthor = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(resAuthor.name);
  const [description, setDescription] = React.useState(resAuthor.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({newName: name, newAbout: description});
  }

  function closePopAuthor () {
    props.onClose()
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName(resAuthor.name);
      setDescription(resAuthor.about);
    }
  }, [props.isOpen])

  return (
    <PopupWithForm 
      title = "Редактировать профиль"
      name = "profileEdit"
      submit = "Сохранить"
      isOpen = {props.isOpen}
      onClose = {closePopAuthor}
      onSubmit = {handleSubmit}
      isThinking = {props.isThinking}>
        <input type="text" 
             className="profile-change__input" 
             name="nameK" id="change-name" 
             value = {name || ''}
             onChange={handleChangeName}
             minLength="2" maxLength="40"
             required/>
        <span className="profile-change__error" id="change-name-error">Ок</span>
        <input type="text" 
             className="profile-change__input" 
             name="profeccionK" id="change-profeccion" 
             value={description || ''}
             onChange={handleChangeDescription}
             minLength="2" maxLength="200" 
             required/>
        <span className="profile-change__error" id="change-profeccion-error">Ок</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;

/*React.useEffect(() => {
    setName(resAuthor.name);
    setDescription(resAuthor.about);
  }, [resAuthor]);*/