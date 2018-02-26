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
      required : false
    },
    dateTime : { 
      type : 'datetime',
      required: true
    },
    repeats : {
      type : 'string',
      enum : ['no-repeat', 'daily', 'weekly'],
      required : true
    },
    repeatsOption: {
      type: "string",
      required : false
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
      type : 'string',
      required : false
    },
    description: {
      type: "string",
      required : false
    },
    user: {
      model: "user",
      required: true
    },
    location : {
      collection: "locationevent",
      via : "event"
    }
  }
};

