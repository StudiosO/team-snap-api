/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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

  }
};

