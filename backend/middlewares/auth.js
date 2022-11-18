const jwt = require('jsonwebtoken');
const NotAuthError = require('../errores/errornotauth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.authUser = (req, res, next) => {
  const { authorization } = req.headers;

  /* if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthError('Необходима авторизация1');
  } */
  // if (!req.user) {
    if (!req.headers) {
      throw new NotAuthError('Необходима авторизация10');
    }

    if (!req.headers.accept) {
      console.dir(req.headers);
      throw new NotAuthError('Необходима авторизация1001');
    }

    if (!req.headers.authorization && ) {
      // throw new NotAuthError('Необходима авторизация101');
      throw new NotAuthError('Необходима авторизация1002');
    }

    if (!authorization) {
      throw new NotAuthError('Необходима авторизация11');
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new NotAuthError('Необходима авторизация12');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'simpleKey');
    } catch (err) {
      throw new NotAuthError('Необходима авторизация2');
    }

    req.user = payload; // записываем пейлоуд в объект запроса
  // }

  next(); // пропускаем запрос дальше
};
