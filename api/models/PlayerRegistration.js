/**
 * PlayerRegistration.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection : 'mongoServer',
  attributes: {
  	value: {
      type: 'string',
      required: true      
    },    
    registrationField: {
      model: 'registrationFields'
    },
    players: {
      collection: 'players',
      via: 'playerRegistration'
    }
  }
};

