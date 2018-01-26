/**
 * Games.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection : 'mongoServer',
  attributes: {
    team : {
      model : 'Teams',
      required : true
    },
    dateTime : {
      type : 'datetime',
      required : true
    },
    attendenceTraking : {
      type : 'boolean',
      required : true,
    },
    notifyTeam : {
      type : 'boolean',
      required : true
    },
    optionalInfo : {
      type : 'json',
      required : false
    },
    opponent : {
      collection : 'opponentgame',
      via : 'game'
    },
    location : {
      collection : 'locationgame',
      via : 'game'
    }
  }
};

