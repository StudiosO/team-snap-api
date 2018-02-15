/**
 * Players.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection : 'mongoServer',
  attributes: {
    user : {
      model : 'User',
      unique : true
    },
    team : {
      model : 'Teams'
    },
    positions :{
      collection : "positions",
      via : "player"
    },
    managerAccess : {
      type : 'Boolean',
      required : true
    },
    nonPlayer : {
      type : 'Boolean',
      required : true
    },
    birthDay : {
      type : 'String',
      required : true
    },
    yerseyNumber : {
      type : 'String',
      required : true
    },
    gender : {
      type : 'String',
      required : true
    },
    image : {
      type : 'string',
      required : false
    },
    parents : {
      collection : "parents",
      via : 'childs'
    },
    playerRegistration: {
      model: 'PlayerRegistration'
    },
  }
};

