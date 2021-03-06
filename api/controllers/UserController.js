/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 //#region for creation of user using a new team or exists team
 function createTeam(name, callback){
    Teams.create({
        name : name
    }).exec(function(err, team){
        if( err ){ callback(err); return; }

        callback(null, team);
    })
 }

 function createUserUsingTeam(req, res, team){
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
                team: team
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
 }

function newUserXTeam(req, res){
    if( req.body.hasOwnProperty("newTeam") && req.body.newTeam === true ){
        createTeam(req.body.teamName, function(err, team){
            if( err ){ res.serverError(err); return; }
            createUserUsingTeam(req, res, team.id);
        });
    }else{
        createUserUsingTeam(req, res, req.body.teamID);
    }
    
}

//#endregion


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
    newUserXTeam: newUserXTeam,

    login: function(req, res){
        let password = require('../../password')
        User.findOne({
            username: req.body.username
        }).populate("role").exec(function(err, user){
            if(err){ res.serverError(err); return; }
            console.log(user)
            if( user ){
                if( password.validate(req.body.password, user.password) ){
                    res.json(user);
                }else{
                    res.json({ message : "User not found"})
                }
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
                if(erro){ res.serverError(erro); return; }

                if( req.body.contacts.length > 0 ){
                    var each = require('sync-each');
                    each(req.body.contacts, function (item, next) {
                            
                        Contacts.create({
                            user : user.id,
                            _type: item.type,
                            name : item.name,
                            info: item.info
                        }).exec(function(err, cts){

                            if(err){ next(err,cts) }

                            next();
                        })
                        
                    },
                    function (e,transformedItems) {
                        if(e){ res.serverError(e); return;}

                        res.json(user);
                    })

                }else{
                    res.json(user);
                }
            })
        })
    }
};

