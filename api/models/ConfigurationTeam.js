/**
 * ConfigurationTeam.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection : 'mongoServer',
  attributes: {
    privateDetailsPlayer : {
      type : 'boolean',
      required : true
    },
    team : {
      model : 'teams',
      unique : true,
      required : true
    }
  }
};

