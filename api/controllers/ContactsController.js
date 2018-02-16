/**
 * ContactsController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newContact : function(){
        
    },
    getXUSer: function(req, res){
        Contacts.find({
            user : req.params.id
        })
        .exec(function(err, contacts){
            if(err){ res.serverError(err); return; }

            res.json(contacts);
        })
    }
};

