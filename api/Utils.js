const Jwt = require('jsonwebtoken');
const Boom = require('boom');

module.exports = class Utils {
  /**
   * Checks whether the provided id is a valid mongoDB-objectId
   */
  static isValidObjectId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
  }

  static isAuthenticated(req, res, next) {
    const token = req.cookies.user_token;
    Utils.verifyToken(token, (err, decoded) => {
      if (err) return next(Boom.unauthorized('Not authorized'));
      next();
    });
  }

  static verifyToken(token, cb) {
    Jwt.verify(
      token,
      process.env.JWT_PRIVATE,
      (err, decoded) => {
        if (err) return cb(new Error({ success: false, message: 'Failed to authenticate token.', err }), null);
        cb(null, decoded);
      }
    );
  }
};

