/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newEvent : function(req, res){
        Event.create({
            team : req.body.team,
            name : req.body.name,
            shortLabel : req.body.shortLabel,
            repeats : req.body.repeats,
            dateTime : require('moment')(req.body.dateTime, 'MM/DD/YYYY hh:mm:ss a').toISOString(),
            attendeceTracking : req.body.attendeceTracking,
            notifyTeam : req.body.notifyTeam,
            optionalInfo : req.body.optionalInfo,
        }, (error, event)=>{
            if (error) { return res.serverError(error); }

            LocationEvent.create({
                event : event.id,
                name : req.body.eventName,
                address : req.body.address,
                link : req.body.link,
                detail : req.body.detail
            }, (err, location)=>{
                if (err) { return res.serverError(err); }

                res.json({
                    event,
                    location
                })
            })
        })
    }
};

