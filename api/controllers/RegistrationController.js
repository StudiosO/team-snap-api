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

		  sails.log('Wow, there are %d users named Finn.', registrationResult.length);
		  sails.log('Check it out, some of them probably have a dad named Joshua or Martin:', registrationResult);

		  return res.json(registrationResult);
		});
	}	
};

