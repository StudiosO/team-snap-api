/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createUser : function(req, res){
        
    },
    authenticate : function(req, res){
        
    },
    getAll : function(req, res){
        User.find().exec(function(err, users){
            if(err) throw new Error(err);
            
            res.send(users)
        })
    }
};

