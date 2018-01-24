/**
 * OppenentGame.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection : 'mongoServer',
  attributes: {
    game : {
      model : 'Games',
      required : true
    },
    name : {
      type : 'string',
      required : true
    },
    person : {
      type : 'string',
      required : true
    },
    phone : {
      type : 'string',
      required : true
    },
    email : {
      type : 'string',
      required : true
    }
  }
};

