import React from 'react';
import closeIcon  from '../images/closeIcon.svg';

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <div className={`popup ${this.props.isOpen && 'popup_opened'}`} 
      style={{backgroundColor: `rgba(0, 0, 0, 0.9)`}} id="popShowPicture">
        <div className="popup__show">
          <button type="button" className="popup__nosave-button" onClick={this.props.onClose}>
            <img src={closeIcon} alt="Выйти" className="popup__nosave-image"/>
          </button>
          <div className="popup__list">
            <img src={this.props.picture} alt="Отмена" className="popup__bigpicture" id="popShowPic"/>
            <p className="popup__text" id="popShowText">{this.props.text}</p>
          </div>        
        </div>
      </div>
    );
  }
} 
export default ImagePopup;