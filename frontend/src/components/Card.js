import React from 'react';
import heartBlanc  from '../images/heart_blanc.svg';

import {CurrentUserContext} from '../context/CurrentUserContext.js';

function Card (props) {
  const resAuthor = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === resAuthor._id;
  const isLiked = props.card.likes.some(i => i._id === resAuthor._id);

  const cardDeleteButtonClassName = (
    `element__basura ${isOwn && 'element__basura_activ'}`
  );

  const cardLikeButtonClassName = (
    `element__button-liked ${isLiked && 'element__button-liked_activ'}`
  ); 
  
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  // console.log(isOwn)
  return (
      <div className="element">
        <img className="element__image" src={props.card.link} alt="Картинка" 
        onClick={handleClick}/>

        <button type='button' className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <div className="element__info">
          <h3 className="element__info-text">{props.card.name}</h3>
          <div className="element__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
              <img src={heartBlanc} alt="Сердечко" className="element__button-liked-picture"/>
            </button>
            <p className="element__likes-info">{props.card.likes.length}</p>
          </div>
        </div>
        
      </div>
    );
  
} 
export default Card;

//  key={this.props.card._id}
/*
class Card extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
    this._props = this.props;
  }

  handleClick() {
    this._props.onCardClick(this._props.card);
  }

  render() {
    // console.log(this.context._id)

    return (
      <div className="element">
        <img className="element__image" src={this.props.card.link} alt="Картинка" 
        onClick={this.handleClick.bind(this)}/>

        <button type='button' className="element__basura"></button>
        <div className="element__info">
          <h3 className="element__info-text">{this.props.card.name}</h3>
          <div className="element__likes">
            <button type="button" className="element__button-liked">
              <img src={heartBlanc} alt="Сердечко" className="element__button-liked-picture"/>
            </button>
            <p className="element__likes-info">{this.props.card.likes.length}</p>
          </div>
        </div>
        
      </div>
    );
  }
} 
export default Card;
*/