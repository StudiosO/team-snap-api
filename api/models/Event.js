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
      model : "teams",
      unique : false
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
      type : 'datetime',
      require: true
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
    },
    user: {
      model: "user",
      required: true
    }
  }
};

