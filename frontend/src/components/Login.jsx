import React from 'react';
import { withRouter } from 'react-router-dom';
import IdentificationWithForm from '../components/IdentificationWithForm.js';

function Login(props) {
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

  function closePopLogin () {
    props.onClose()
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!userEmail || !userPassword){
      return;
    }
    props.handleSubmitLogin(userEmail, userPassword)
  }

  return (
    <div className="login">
        <IdentificationWithForm 
          title = "Вход"
          name = "login"
          submit = "Войти"
          isOpen = {props.isOpen}
          onClose = {closePopLogin}
          onSubmit = {handleSubmit}
          isRegisterPopupOpen = {props.isRegisterPopupOpen}
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

export default withRouter(Login);