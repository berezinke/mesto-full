// import React from 'react';
import {headers, baseUrl, baseEndPointReg, baseEndPointAuth, baseMethodAuth, baseTitle,
  baseSuccessReturnAuth, baseSuccessReturnCheck,
  tokenEndPoint, baseMethodValidToken, baseTitleValidToken, baseSuccessReturnValidToken } 
  from './Utils.js'

class Api {
  constructor() {

    /**
     pathToServer, headers1, baseUrl, baseEndPointReg, baseEndPointAuth, baseMethodAuth, baseTitle,
    baseSuccessReturnAuth, baseSuccessReturnCheck,
    baseMethodValidToken, baseTitleValidToken, baseSuccessReturnValidToken
     */

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

    /*this._baseUrl = this._baseUrl.bind(this);
    this._methodAuth = this._methodAuth.bind(this);
    this._baseTitle = this._baseTitle.bind(this);
    this._baseEndPointReg = this._baseEndPointReg.bind(this);
    this._baseEndPointAuth = this._baseEndPointAuth.bind(this);
    
    this._tokenEndPoint = this._tokenEndPoint.bind(this);
    this._baseMethodValidToken = this._baseMethodValidToken.bind(this);
    this._baseTitleValidToken = this._baseTitleValidToken.bind(this);*/


  };

  // Запись и обратно
  _isDone(res) {
    if (res.ok) {
      return res.json();
    }
    // return Promise.reject(`Ошибка: ${res.status}`);
    return res.json()
      .then((err) => {
        err.statusCode = res.status; 
        return Promise.reject(err);
      })      
  }

  // Получение информации о карточках
  getInitCards() {
    return fetch(this._pathToCard, {
      // headers: this._headers
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
      method: this._methodAuth, // 'POST'
      headers: this._baseTitle, // {'Accept': 'application/json', "Content-Type": "application/json"};
      body: JSON.stringify({"email":userEmail, "password": userPassword})
    })
    .then((res) => {return this._isDone(res)})
  };

  // Регистрация
  userRegister (userEmail, userPassword) {
    const pathToserv = this._baseUrl + this._baseEndPointReg;
    console.log(pathToserv);
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
    this._baseTitleValidToken.authorization = this._baseTitleValidToken.authorization + userJWT;
    let path = this._baseUrl + this._tokenEndPoint; // '/users/me'
    let arrHeaders = this._baseTitleValidToken;
    let meTh = this._baseMethodValidToken; // 'GET'

    console.log('2');
    console.log(this._baseTitleValidToken.authorization);
    console.log('3');
    console.log(arrHeaders);
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

const exApi = new Api(); //pathToServer, headers
export default exApi;