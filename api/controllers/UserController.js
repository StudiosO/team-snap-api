/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    verified: function(req, res){
        User.update({id: req.params.id, verificationCode: req.params.code }, { verified : true })
        .exec(function afterwards(err, updated){

            if (err) {
              res.serverError(err);
              return;
            }
            if( updated.length === 0){
                res.json({ message : null })
            }else{
                res.redirect('/login');
            }
        
        })
    
    },
    roles: function(req, res){
        res.json([
            "Player",
            "Manager",
            "Family"
        ]);
    },
    newUserXTeam: function(req, res){
        if(req.body.hasOwnProperty('role') && req.body.role === "Manager" &&
        req.body.hasOwnProperty("teamID") &&
        Object.prototype.toString.call(req.body.teamID) === "[object String]" ){

            Roles.create({
                name : "Manager"
            }).exec(function(err, role){
                if(err){ res.serverError(err); return; }

                User.create({
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    role: role.id
                }).exec(function(er, user){
                    if(er){ res.serverError(err); return; }

                    Managers.create({
                        user: user.id,
                        team: req.body.teamID
                    }).exec(function(e, m){
                        Teams.find({
                            id : req.body.teamID
                        })
                        .populate("managers").exec(function(erS, team){
                            res.json({
                                user,
                                role,
                                team
                            })
                        })
                        
                    })
                    
                })

            })
        }else{
            res.json({ message : "only user manager can register and create team at the same time"})
        }
        
    },

    login: function(req, res){
        let password = require('../../password')
        User.findOne({
            username: req.body.username
        }).populate("role").exec(function(err, user){
            if(err){ res.serverError(err); return; }
            
            console.log(user.password)
            if( password.validate(req.body.password, user.password) ){
                res.json(user);
            }else{
                res.json({ message : "User not found"})
            }

        })
    },

    newUserXFamily: function(req, res){
        Roles.create({
            name : "Family"
        }).exec(function(err, role){
            if(err){ res.serverError(err); return; }

            User.create({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password: "none"
            }).exec(function(er, user){
                if(er){ res.serverError(er); return; }

                res.json(user);
            })
        })
    },

    newUserXPlayer: function(req, res){
        Roles.create({ 
            name : "Player"
        }).exec(function(err, role){
            if(err){ res.serverError(error); return; }

            User.create({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: role.id
            }).exec(function(erro, user){
                if(err){ res.serverError(error); return; }

                
            })
        })
    }
};

