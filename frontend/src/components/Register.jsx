import React from 'react';
import { withRouter } from 'react-router-dom';
import IdentificationWithForm from '../components/IdentificationWithForm.js';

// import './styles/Register.css';

function Register(props) {
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  /*React.useEffect(() => {
    if (props.messageInfo === 'messageOk') {
      setUserEmail('');
      setUserPassword('');
    }
  }, [props.messageInfo]);*/

  function handleChangeUserEmail(e) {
    setUserEmail(e.target.value);    
  }
  function handleChangeUserPassword(e) {
    setUserPassword(e.target.value);    
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!userEmail || !userPassword){
      return;
    }
    props.handleSubmitRegister (userEmail, userPassword)
  }
  // props.setRegisterPopupOpen(true);
  return (
    <div className="register">
      <IdentificationWithForm 
        title = "Регистрация"
        name = "registration"
        submit = "Зарегистрироваться"
        isOpen = {props.isOpen}
        setRegisterPopupOpen = {props.setRegisterPopupOpen}
        isRegisterPopupOpen = {props.isRegisterPopupOpen}
        history = {props.history}
        setArrAuth = {props.setArrAuth}
        onSubmit = {handleSubmit}
        isThinking = {props.isThinking}>
        <input type="email" 
          className="identification__input" 
          name="username"
          placeholder="Email" 
          value = {userEmail}
          onChange={handleChangeUserEmail}
          required/>
        <input type="password" 
          className="identification__input"
          name="password"
          value = {userPassword}
          onChange={handleChangeUserPassword}
          placeholder="Пароль" required/>
      </IdentificationWithForm>
    </div>
  )
}

export default withRouter(Register);