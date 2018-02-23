/**
 * LocationEvent.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection : "mongoServer",
  attributes: {
    event : {
      model : 'event',
      required : true
    },
    lat: {
      type: "string",
      required: true
    },
    lng : {
      type: "string",
      required : true
    },
    link : {
      type : 'string',
      required : false
    },
    detail : {
      type : 'string',
      required : true
    }
  }
};

