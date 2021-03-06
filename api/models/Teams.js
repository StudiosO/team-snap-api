/**
 * Teams.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection : 'mongoServer',
  attributes: {
    name : {
      type : 'String',
      required : true
    },
    league : {
      model : 'leagues'
    },
    managers : {
      collection : "managers",
      via : 'team'
    },
    players : {
      collection : "players",
      via : "team"
    },
    events : {
      collection : "event",
      via : "team"
    },
    configuration : {
      collection : "configurationteam",
      via : "team"
    }

  }
};

