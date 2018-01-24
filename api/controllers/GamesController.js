/**
 * GamesController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newGame : (req, res)=>{
        Games.create({
            team : erq.team,
            dateTime : req.body.dateTime,
            attendenceTraking : req.body.attendenceTraking,
            notifyTeam : req.body.notifyTeam,
            optionalInfo : req.body.optionalInfo,
        }, (error, game)=>{
            if (error) { return res.serverError(err); }

            LocationGame.create({
                game : game.id,
                address : req.body.address,
                link : req.body.link,
                detail : req.body.detail
            }, (err, location)=>{
                if (error) { return res.serverError(err); }

                OppenentGame.create({
                    game : game.id,
                    name : req.body.name,
                    person : req.body.person,
                    phone : req.body.phone,
                    email : req.body.email
                }, (er, opponent)=>{

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

