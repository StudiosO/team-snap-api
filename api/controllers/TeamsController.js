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
        }).exec(function(err, team){
            if (err) {
                return res.serverError(err);
              }
              if (!team) {
                return res.notFound('Could not find Finn, sorry.');
              }

              Players.find({
                  team_id : req.params.id
              }).exec(function(error, _players){
                if (err) {
                    return res.serverError(err);
                  }
                  if (!_players) {
                    return res.notFound('Could not find Finn, sorry.');
                  }

                  team.players = _players;
                  res.json(team);
              })
        })
    } 
};

