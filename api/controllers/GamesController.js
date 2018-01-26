/**
 * GamesController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newGame : (req, res)=>{
        Games.create({
            team : req.body.team,
            dateTime : require('moment')(req.body.dateTime, 'MM/DD/YYYY hh:mm:ss a').toISOString(),
            attendenceTraking : req.body.attendenceTraking,
            notifyTeam : req.body.notifyTeam,
            optionalInfo : req.body.optionalInfo,
        }, (error, game)=>{
            if (error) { return res.serverError(error); }

            LocationGame.create({
                game : game.id,
                name : req.body.locationName,
                address : req.body.address,
                link : req.body.link,
                detail : req.body.detail
            }, (err, location)=>{
                if (err) { return res.serverError(err); }

                OpponentGame.create({
                    game : game.id,
                    name : req.body.opponentName,
                    person : req.body.person,
                    phone : req.body.phone,
                    email : req.body.email
                }, (er, opponent)=>{
                    if(er){ return res.serverError(er); }

                    res.json({
                        game,
                        location,
                        opponent
                    })
                })
            })
        })
    }
};

