/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    roleID : {
      type : 'String',
      required : true
    },
    username : {
      type : 'String',
      required : true
    },
    firstName : {
      type : 'String',
      required : true
    },
    lastName : {
      type : 'String',
      required : true
    },
    email : {
      type : 'String',
      unique: true,
      required: true,
      contains: '@'
    },
    password : {
      type : 'String',
      required : true
    },
    role : { model : 'Roles' }
  }
};

