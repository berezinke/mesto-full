import okPic  from '../images/okPic.svg';
import upsPic  from '../images/upsPic.svg';

export const buttonEdit = document.querySelector('#button_edit'); // Кусто
export const nameCh = document.querySelector('#change-name');
export const infoCh = document.querySelector('#change-profeccion');
export const objAuthor = document.querySelector('#profileEdit'); // форма Кусто
export const objCard = document.querySelector('#cardAdd'); // форма Карта
export const objAvatar = document.querySelector('#avatarEdit'); // форма Аватар

export const validationObject = {
  formSelector: '.profile-change',
  inputSelector: '.profile-change__input',
  submitButtonSelector: '.profile-change__submit',
  inactiveButtonClass: 'profile-change__submit_disabled',
  inputErrorClass: 'profile-change__input_type_error',
  errorClass: 'profile-change__error_visible'
};

export const buttonAddPicture = document.querySelector('.profile__add-button'); // Новая карточка
export const cardsPosition = document.querySelector('.elements'); // Создание карточек
export const cardSelector = '#elementTemplate';

// Данные о группе, токене ...
// const miCogort = 'cohort-46';
export const miToken = '17354b5a-cdf3-4826-b8f6-745070d32c9c';
// export const pathToServer = 'api.mesto-server.students.nomoredomains.icu' // `https://mesto.nomoreparties.co/v1/${miCogort}`;
export const baseUrl = 'api.mesto-server.students.nomoredomains.icu' // 'https://auth.nomoreparties.co';
export const headers = {
  authorization: miToken,
  'Content-Type': 'application/json'
};

// Авторизация
// export const baseUrl = 'https://auth.nomoreparties.co';
export const baseEndPointReg = '/signup';
export const baseEndPointAuth = '/signin';
export const baseMethodAuth = 'POST';
export const baseTitle = {'Accept': 'application/json', "Content-Type": "application/json"};
export const baseBodyAuth = {"password": "somepassword", "email": "email@yandex.ru"};
export const baseSuccessReturnAuth = {"data": {"_id": "5f5204c577488bcaa8b7bdf2", "email": "email@yandex.ru"}};
export const baseBodyCheck = {"password": "dsfsdfsdfsdf", "email": "email@email.ru"};
export const baseSuccessReturnCheck = {
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
};
export const tokenEndPoint = '/users/me';
export const baseMethodValidToken = 'GET';
export const baseTitleValidToken = {'Accept': 'application/json', "Content-Type": "application/json",
                                    "Authorization" : "Bearer "};
export const baseSuccessReturnValidToken = {"_id":"1f525cf06e02630312f3fed7", "email":"email@email.ru"};
export const objAuth = {authReg:['sign-up', '  Зарегистрироваться'], authEnter:['sign-in', '  Войти'], authExit:['sign-in', '  Выйти']};

export const infoText = {messageOkReg: {text: 'Вы успешно зарегистрировались!', image: okPic},
                         messageOkEnter: {text: 'Вы успешно авторизовались!', image: okPic},
                         messageUps: {text: 'Что-то пошло не так! Попробуйте еще раз.', image: upsPic},
                        messageInfo: {text: 'Вношу изменения в базу...', image: okPic}};