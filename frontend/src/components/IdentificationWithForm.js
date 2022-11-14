import React from 'react';
import {objAuth} from '../utils/Utils.js';

function IdentificationWithForm (props) {
  
  function linkToLogin() {
    
    props.history.push('sign-in');
    props.setRegisterPopupOpen(false);
    props.setArrAuth(objAuth.authReg)
  }   

  return (
    <div className="identification__container">
      <form className="identification__formChange" 
            name={props.name} 
            onSubmit = {props.onSubmit}
            noValidate>
        <h3 className="identification__title">
          {props.title}
        </h3>
        {props.children}
        <button type="submit"
                className="identification__submit">
          {props.isThinking ? "Думаю..." : props.submit}
        </button>
        <button className = {`identification__link ${props.isRegisterPopupOpen && 'identification__link_open'}`} onClick = {linkToLogin}>
          Уже зарегистрированы? Войти
        </button>
      </form>
    </div>
      
  );
} 
export default IdentificationWithForm;
