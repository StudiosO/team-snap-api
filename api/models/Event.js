/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection : "mongoServer",
  attributes: {
    team : {
      collection : 'locationevent',
      via : 'event',
      required : true
    },
    name : {
      type : "string",
      required : true
    },
    shortLabel : {
      type : 'string',
      required : true
    },
    dateTime : { 
      type : 'datetime'
    },
    repeats : {
      type : 'string',
      enum : ['no-repeat', 'daily', 'weekly'],
      required : true
    },
    attendeceTracking : {
      type : 'boolean',
      required : true
    },
    notifyTeam : {
      type : 'boolean',
      required : true
    },
    optionalInfo : {
      type : 'json',
      required : true
    }
  }
};
