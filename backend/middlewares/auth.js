const jwt = require('jsonwebtoken');
const NotAuthError = require('../errores/errornotauth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.authUser = (req, res, next) => {
  const { Authorization } = req.headers;

  /* if (!Authorization || !Authorization.startsWith('Bearer ')) {
    throw new NotAuthError('Необходима авторизация1');
  } */
  if (!req.headers) {
    throw new NotAuthError('Необходима авторизация10');
  }

  if (!req.headers.Authorization) {
    throw new NotAuthError('Необходима авторизация101');
  }

  if (!Authorization) {
    throw new NotAuthError('Необходима авторизация11');
  }

  if (!Authorization.startsWith('Bearer ')) {
    throw new NotAuthError('Необходима авторизация12');
  }

  const token = Authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'simpleKey');
  } catch (err) {
    throw new NotAuthError('Необходима авторизация2');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
