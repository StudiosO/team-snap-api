/**
 * Family.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'mongoServer',
  attributes: {
    user:{
      model : 'user',
      unique : true,
      required : true
    },
    child : {
      model : 'players'
    },
    relationship : {
      type : "string",
      required : true
    },
    private: {
      type : "boolean",
      required : true
    },
    receiveEmail : {
      type : 'boolean',
      required: true
    },
    phoneNumber: {
      type : "string",
      required: false
    },
    address: {
      type: "string",
      required: false
    }
  }
};

