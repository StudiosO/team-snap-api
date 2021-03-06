/**
 * Contacts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection : 'mongoServer',
  attributes: {
    user : {
      model : 'User'
    },
    name : {
      type : 'String',
      required : true
    },
    _type : {
      type : 'String',
      required : true
    },
    info : {
      type : 'String',
      required : true
    }
  }
};

