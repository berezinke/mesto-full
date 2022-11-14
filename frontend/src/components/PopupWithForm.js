import React from 'react';
import closeIcon  from '../images/closeIcon.svg';

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`popup ${this.props.isOpen && 'popup_opened'}`} id={`pop${this.props.name}`}>
        <div className="popup__container">
          <button type="button" 
                  className="popup__nosave-button" 
                  id="buttonNoSave"  
                  onClick={this.props.onClose}>
            <img src={closeIcon} alt="Не сохранять" className="popup__nosave-image"/>
          </button>
          <form className="profile-change" 
                name={this.props.name} 
                id="avatarEdit" 
                onSubmit = {this.props.onSubmit}
                noValidate>
            <h3 className="profile-change__title">
              {this.props.title}
            </h3>
            {this.props.children}
            <button type="submit" 
                    className="profile-change__submit" 
                    id="ButtonCreateAvatar">
              {this.props.isThinking ? "Думаю..." : this.props.submit}
            </button>
          </form>
        </div>
      </div>
    );
  }
} 
export default PopupWithForm;