import React from 'react';
import closeIcon  from '../images/closeIcon.svg';
import {infoText} from '../utils/Utils.js';

function PopupInfo (props) {
  
  return (
    <div className={`popup ${props.isOpened && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" 
                className={`popup__nosave-button ${props.infoPop == 'messageInfo' && 'popup__nosave-button_inActive'}`}
                id="buttonNoSave"
                onClick={props.onClose}>
          <img src={closeIcon} alt="Не сохранять" className="popup__nosave-image"/>
        </button>
        <form className="profile-change_info" 
              name='infoName'
              noValidate>
          <img src={infoText[props.infoPop].image} alt="Улыбаемся и машем" className="popup__picture"/>
          <h3 className="profile-change__title" style={{textAlign: `center`}}>
            {infoText[props.infoPop].text}
          </h3>
          
        </form>
      </div>
    </div>
  )
} 

export default PopupInfo;