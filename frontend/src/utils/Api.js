// import React from 'react';
import { baseUrl, baseEndPointReg, baseEndPointAuth, baseMethodAuth, baseTitle,
  tokenEndPoint, baseMethodValidToken, baseTitleValidToken } 
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
    // this._headers = headers;
    this._baseUrl = baseUrl;
    this._methodAuth = baseMethodAuth;
    this._baseTitle = baseTitle;
    this._baseEndPointReg = baseEndPointReg;
    this._baseEndPointAuth = baseEndPointAuth;
    
    this._tokenEndPoint = tokenEndPoint;
    this._baseMethodValidToken = baseMethodValidToken;
    this._baseTitleValidToken = baseTitleValidToken;

    this.tokenUser = '';

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
    console.log('Cards');
    console.log(this.tokenUser);
    return fetch(this._pathToCard, {}).then((res) => {
      return this._isDone(res)
    })
  };
  // , { headers: this._headers }
  
  // Получение иформации об авторе
  getAuthorInfo() {
    return fetch(this._pathToAuthor, {
      // headers: this._headers
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Отправка информации об авторе на сервер
  setAuthorInfo({newName, newAbout}) {
    return fetch(this._pathToAuthor, {
      method: 'PATCH',
      // headers: this._headers,
      body: JSON.stringify({name: newName, about: newAbout})
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Добавление карточки на сервер
  addCardToServer({newName, newLink}) {
    
    return fetch(this._pathToCard, {
      method: 'POST',
      // headers: this._headers,
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
      // headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Постановка лайка на карточку
  putLikeToCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    
    return fetch(pathToOneCard, {
      method: 'PUT',
      // headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Снятие лайка с карточки
  putoffLikeFromCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    
    return fetch(pathToOneCard, {
      method: 'DELETE',
      // headers: this._headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Отправка информации об аватаре на сервер
  setAuthorAvatar({newAvatar}) {

    return fetch(this._pathToAvatar, {
      method: 'PATCH',
      // headers: this._headers,
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

    console.log('Reg');
    console.log(pathToserv);
    console.log(this._methodAuth);
    console.log(this._baseTitle);

    // let setHeaders = this._setArrHeaders (methodServ, userJWT)

    return fetch(pathToserv, {
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

    /* this._baseTitleValidToken.Authorization = this._baseTitleValidToken.Authorization + userJWT;
    
    let path = this._baseUrl + this._tokenEndPoint;
    let arrHeaders = this._baseTitleValidToken;
    let meTh = this._baseMethodValidToken;

    return fetch(path, {
      method: meTh,
      headers: arrHeaders}) */





    console.log('2');
    console.log(arrHeaders);
    console.log(path);
    console.log(meTh);

    let setHeaders = this._setArrHeaders(meTh, userJWT);
    console.log('77');
    console.log(setHeaders);
    console.log(userJWT);


    // return fetch(path, setHeaders)
    return fetch(path, {
      method: meTh,
      headers: arrHeaders})
    .then((res) => {
      return this._isDone(res)})
    .then((res) => {
      console.log('444');
      console.log(res);
      console.log('3');
      this.tokenUser = this._baseTitleValidToken.authorization;
      return res;
    })
    .catch((err) => {
      console.log('4');
      console.log(err)});

    // {
    //   method: meTh,
    //  headers: arrHeaders}
  }

  _setArrHeaders (methodServ, userJWT) {
    let token = userJWT // .replace('Bearer ', '')
    let arrHeaders = this._baseTitleValidToken;

    token = this._baseTitleValidToken.authorization + token;
    arrHeaders.authorization = token;

    return {method: methodServ,
      headers: arrHeaders}

    // this._setArrHeaders (methodServ, this.tokenUser)
  };

};

const exApi = new Api(); //pathToServer, headers
export default exApi;