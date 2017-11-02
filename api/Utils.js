'use strict';

module.exports = class Utils {
  /**
   * Checks whether the provided id is a valid mongoDB-objectId
   */
  static isValidObjectId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
  }
};
