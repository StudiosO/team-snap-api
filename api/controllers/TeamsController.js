/**
 * TeamsController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getAllData : function(req, res){
        Teams.findOne({
            id : req.params.id
        })
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
                  }).populate('user')
                  .populate('positions')
                  .exec(function(error, _players){
                    if (err) {
                        return res.serverError(err);
                      }
                      if (!_players) {
                        return res.notFound('Could not find Players, sorry.');
                      }
                      
                      res.json({
                          managers,
                          team,
                          players : _players
                      });
                  })

            })
            
        })
    }

    /*getAllData : function(req, res){
        Teams.findOne({
            id : req.params.id
        }).exec(function(err, team){
            if (err) {
                return res.serverError(err);
              }
              if (!team) {
                return res.notFound('Could not find Finn, sorry.');
              }

              Players.native(function(error, collection){
                    if (error) return res.serverError(err);

                    collection.find({
                        team_id : team.id
                    }).populate('user_id').toArray(function (err, results) {
                        if (err) return res.serverError(err);
                        team.players = results;
                        return res.ok(team);
                      });
              })
        })
    }*/
};

