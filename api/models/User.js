/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var code, mailer = require("../../mailer")

module.exports = {
  connection: 'mongoServer',
  attributes: {
    firstName: {
      type: 'string',
      required: true   
    },
    lastName: {
      type: 'string',
      required: true
    },
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'string',      
      required: true
    },
    verificationCode : {
      type: "string",
      required : false
    },
    verified : {
      type: 'boolean',
      required : false
    },
    role: {
      model: 'roles'
    },
    player : {
      collection : 'players',
      via: 'user'
    },
    parent :{
      collection : 'parents',
      via : "user"
    },
    contacts : {
      collection : 'contacts',
      via : 'user'
    },
    devices: {
      collection: 'devices',
      via: 'user'
    },
    ux_event: {
      collection: 'uxevent',
      via: 'user'
    } 

  },

  beforeCreate: function(user, callback){
    let randomatic = require("randomatic")
    code = randomatic('aA0', 6)
    user.verificationCode = code
    user.verified = false

    //creat hash
    user.password = require('../../password').hash(user.password)

    callback();
  },

  afterCreate : function(newUser, cb){
    mailer.sendCode(newUser.id, newUser.email, code)
    cb();
  }
  
};

