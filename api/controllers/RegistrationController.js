/**
 * RegistrationController
 *
 * @description :: Server-side logic for managing registrations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getRegistration: function(req, res){
		RegistrationFields.find().populate('fields').exec(function (err, registrationResult){
		  if (err) {
		    return res.serverError(err);
		  }

		  sails.log('# ', registrationResult.length);
		  sails.log('results: ', registrationResult);

		  return res.json(registrationResult);
		});
	}	
};

