/**
 * PlayersController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getXTeam: function(req, res){
        Players.find({
            team : req.params.id
        })
        .populate("user")
        .populate("family")
        .exec(function(err, players){
            if(err){ res.serverError(err); return; }

            res.json(players)
            
        })
    }
};

