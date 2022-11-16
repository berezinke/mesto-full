// import React from 'react';
import {headers, baseUrl, baseEndPointReg, baseEndPointAuth, baseMethodAuth, baseTitle,
  baseSuccessReturnAuth, baseSuccessReturnCheck,
  tokenEndPoint, baseMethodValidToken, baseTitleValidToken, baseSuccessReturnValidToken } 
  from './Utils.js'

class Api {
  constructor() {
    this._pathToCard = `${baseUrl}/cards`;
    this._pathToAuthor = `${baseUrl}/users/me`;
    this._pathToAvatar = this._pathToAuthor + '/avatar';
    this._headers = headers;
    this._baseUrl = baseUrl;
    this._methodAuth = baseMethodAuth;
    this._baseTitle = baseTitle;
    this._baseEndPointReg = baseEndPointReg;
    this._baseEndPointAuth = baseEndPointAuth;
    
    this._tokenEndPoint = tokenEndPoint;
    this._baseMethodValidToken = baseMethodValidToken;
    this._baseTitleValidToken = baseTitleValidToken;
  };

  // Запись и обратно
  _isDone(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение информации о карточках
  getInitCards() {
    return fetch(this._pathToCard, {
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  
  // Получение иформации об авторе
  getAuthorInfo() {
    return fetch(this._pathToAuthor, {
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Отправка информации об авторе на сервер
  setAuthorInfo({newName, newAbout}) {
    return fetch(this._pathToAuthor, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: newName, about: newAbout})
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Добавление карточки на сервер
  addCardToServer({newName, newLink}) {
    
    return fetch(this._pathToCard, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: newName, link: newLink})
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Удаление карточки с сервера
  deleteCardFromServer(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard
    return fetch(pathToOneCard, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Постановка лайка на карточку
  putLikeToCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    
    return fetch(pathToOneCard, {
      method: 'PUT',
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Снятие лайка с карточки
  putoffLikeFromCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    
    return fetch(pathToOneCard, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Отправка информации об аватаре на сервер
  setAuthorAvatar({newAvatar}) {

    return fetch(this._pathToAvatar, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: newAvatar})
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Авторизация
  userAuthorize (userEmail, userPassword) {
    return fetch(this._baseUrl + this._baseEndPointAuth, {
      method: this._methodAuth,
      headers: this._baseTitle,
      body: JSON.stringify({"email":userEmail, "password": userPassword})
    })
    .then((res) => {return this._isDone(res)})
  };

  // Регистрация
  userRegister (userEmail, userPassword) {
    return fetch(this._baseUrl + this._baseEndPointReg, {
      method: this._methodAuth,
      headers: this._baseTitle,
      body: JSON.stringify({"email": userEmail, "password": userPassword})    
    })
    .then((res) => {return this._isDone(res)})
    .then((res) => {
      
      return res;
    })
    .catch((err) => console.log(err));
  };

  // Проверка токена
  userCheckToken (userJWT) {
    this._baseTitleValidToken.Authorization = this._baseTitleValidToken.Authorization + userJWT;
    // this._baseTitleValidToken.Authorization = this._baseTitleValidToken.Authorization + etalon;
    let path = this._baseUrl + this._tokenEndPoint;
    let arrHeaders = this._baseTitleValidToken;
    let meTh = this._baseMethodValidToken;

    return fetch(path, {
      method: meTh,
      headers: arrHeaders})
    .then((res) => {
      return this._isDone(res)})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err)});
  }
};

const exApi = new Api();
export default exApi;