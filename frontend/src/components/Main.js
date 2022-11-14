import React from 'react';

import Card from '../components/Card.js';
import pen  from '../images/pen.svg';
import plus  from '../images/plus.svg';
import exApi from '../utils/Api.js';

import {CurrentUserContext} from '../context/CurrentUserContext.js';

function Main(props) {
  const resAuthor = React.useContext(CurrentUserContext);
  const userName = resAuthor.name;
  const userDescription = resAuthor.about;
  const userAvatar = resAuthor.avatar;

    return (
      <main >
        <section className="profile">
          <div className="profile__information">
            <button type='button' className="profile__edit-avatar" onClick={props.onEditAvatar}>
              <img src={userAvatar} alt="Портрет Кусто" className="profile__avatar"/>
              <img src={pen} alt="Редактировать" className="profile__edit-avatarPen"/>
            </button>
            <div className="profile__info">
              <div className="profile__text">
                <h1 className="profile__title" id="nameScientist">
                  {userName} 
                </h1>
                <button type="button" className="profile__edit-button" id="button_edit" onClick={props.onEditProfile}>
                  <img src={pen} alt="Редактировать" className="profile__button-image"/>
                </button>
              </div>
              <p className="profile__subtitle" id="profeccionScientist">
                {userDescription}
              </p>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
            <img src={plus} alt="Плюс" className="profile__plus"/>
          </button>
        </section>
        <section className="elements">
          {props.cards.map((card) => (
            <Card key={card._id}
                  card = {card}
                  onCardClick = {props.onCardClick}
                  onClose = {props.onClose}
                  onCardLike = {props.onCardLike}
                  onCardDelete = {props.onCardDelete}/>
          ))}
        </section>
      </main>
    );
  }
  
  export default Main;