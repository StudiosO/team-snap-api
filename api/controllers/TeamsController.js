/**
 * TeamsController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const async = require('async')

module.exports = {
    getAllData : function(req, res){
        Teams.findOne({
            id : req.params.id
        })
        .populate("configuration")
        .exec(function(err, team){
            Managers.find({
                team : req.params.id
            })
            .populate("user")
            .exec(function(err, managers){
                if (err) {
                    return res.serverError(err);
                  }
                  if (!managers) {
                    return res.notFound('Could not find managers, sorry.');
                  }


                  if (err) {
                    return res.serverError(err);
                  }
                  if (!team) {
                    return res.notFound('Could not find Teams, sorry.');
                  }
    
                  Players.find({
                      team : req.params.id
                  })
                  .populate('user')
                  .populate('positions')
                  .populate('parents')
                  .exec(function(error, _players){
                    if (err) {
                        return res.serverError(err);
                      }
                      if (!_players) {
                        return res.notFound('Could not find Players, sorry.');
                      }

                      async.forEachOf(_players, (value, key, callback) => {
                            async.forEachOf(_players[key].parents, (val, k, call) =>{
                                User.findOne({
                                    id : val.user
                                }).exec((EroR, userParent)=>{
                                    if(EroR){
                                        return call(EroR)
                                    }
                                    _players[key].parents[k].user = userParent
                                    call()
                                })
                            }, err => {
                                if (err) return callback(err)
                                
                                callback()
                            })

                        }, err => {
                            if (err) return res.serverError(err)
                            
                            res.json({
                                managers,
                                team,
                                _players
                            })
                        }) 
                })

            })
            
        })
    },

    getTeamXIDUser : function(req, res){
        if( req.params.name === "player"){
            Players.findOne({
                user : req.params.id
            }).exec(function(err, team){
                if( err ){ res.serverError(err); return; }

                res.json(team);
            })
          }else if( req.params.name === "manager" ){
            Managers.findOne({
                user : req.params.id
            }).exec(function(err, team){
                if( err ){ res.serverError(err); return; }

                res.json(team);
            })
          }else if( req.params.name === "parent" ){
            Parents.findOne({
                user : req.params.id
            }).populate('childs').exec(function(err, team){
                if( err ){ res.serverError(err); return; }

                res.json(team);
            })
          }
    }
};

