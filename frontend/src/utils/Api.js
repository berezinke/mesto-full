class Api {
  constructor() {
    this._pathToCard = 'https://api.mesto-server.students.nomoredomains.icu/cards';
    this._pathToAuthor = 'https://api.mesto-server.students.nomoredomains.icu/users/me';
    this._pathToAvatar = this._pathToAuthor + '/avatar';
    
    this._baseUrl = 'https://api.mesto-server.students.nomoredomains.icu';
    this._methodAuth = 'POST';
    this._baseTitle = {'Accept': 'application/json', "Content-Type": "application/json"};
    this._baseEndPointReg = '/signup';
    this._baseEndPointAuth = '/signin';
    
    this._baseMethodValidToken = 'GET';
    this._baseTitleValidToken = {'Accept': 'application/json', "Content-Type": "application/json",
    "authorization" : "Bearer "};
  };

  // Запись и обратно
  _isDone(res) {
    if (res.ok) {
      return res.json()      
    }
    return res.json()
      .then((err) => {
        err.statusCode = res.status; 
        return Promise.reject(err);
      })      
  }

  // Получение информации о карточках
  getInitCards() {
    const headers = this._setArrHeaders();

    return fetch(this._pathToCard, {
      headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // , { headers: this._headers }
  
  // Получение иформации об авторе
  getAuthorInfo() {
    const headers = this._setArrHeaders();

    return fetch(this._pathToAuthor, {
      headers
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Отправка информации об авторе на сервер
  setAuthorInfo({newName, newAbout}) {
    const headers = this._setArrHeaders();

    return fetch(this._pathToAuthor, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({name: newName, about: newAbout})
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Добавление карточки на сервер
  addCardToServer({newName, newLink}) {
    const headers = this._setArrHeaders();

    return fetch(this._pathToCard, {
      method: 'POST',
      headers,
      body: JSON.stringify({name: newName, link: newLink})
    }).then((res) => {
      return this._isDone(res)
   })
  };

  // Удаление карточки с сервера
  deleteCardFromServer(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard
    const headers = this._setArrHeaders();

    return fetch(pathToOneCard, {
      method: 'DELETE',
      headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Постановка лайка на карточку
  putLikeToCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    const headers = this._setArrHeaders();

    return fetch(pathToOneCard, {
      method: 'PUT',
      headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Снятие лайка с карточки
  putoffLikeFromCard(idCard) {
    const pathToOneCard = this._pathToCard + '/' + idCard + '/likes'
    const headers = this._setArrHeaders();

    return fetch(pathToOneCard, {
      method: 'DELETE',
      headers
    }).then((res) => {
      return this._isDone(res)
    })
  };
  // Отправка информации об аватаре на сервер
  setAuthorAvatar({newAvatar}) {
    const headers = this._setArrHeaders();

    return fetch(this._pathToAvatar, {
      method: 'PATCH',
      headers,
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
    .then((res) => {
      
      return this._isDone(res)})
    .then((res) => {
      return res;      
    })
    .catch((err) => {
      console.log(err)});
  };

  // Регистрация
  userRegister (userEmail, userPassword) {
    const pathToserv = this._baseUrl + this._baseEndPointReg;

    return fetch(pathToserv, {
      method: this._methodAuth,
      headers: this._baseTitle, // {'Accept': 'application/json', "Content-Type": "application/json"};
      body: JSON.stringify({"email": userEmail, "password": userPassword})    
    })
    .then((res) => {return this._isDone(res)})
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  };

  // Проверка токена
  userCheckToken () {
    const setHeaders = this._setArrHeaders();
          
    return fetch(this._pathToAuthor, {
      method: this._baseMethodValidToken,
      headers: setHeaders})
    .then((res) => {
      return this._isDone(res)})
    
  }

  _setArrHeaders () {
    if (!('jwt' in localStorage)) {
      return this._baseTitle;
    }
    return { ...this._baseTitle, authorization: `Bearer ${localStorage.getItem('jwt')}` };
  }
};

const exApi = new Api(); //pathToServer, headers
export default exApi;