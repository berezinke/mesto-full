const jwt = require('jsonwebtoken');
const NotAuthError = require('../errores/errornotauth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.authUser = (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization) {
    if (!req.user) {
      throw new NotAuthError('Необходима авторизация1111');
    }
    authorization = req.user;
  }

  if (!authorization.startsWith('Bearer ')) {
    throw new NotAuthError('Необходима авторизация112');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'simpleKey');
  } catch (err) {
    throw new NotAuthError('Необходима авторизация12');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
