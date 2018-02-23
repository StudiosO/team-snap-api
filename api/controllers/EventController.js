/**
 * EventController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 //#region Para comprobar si el usuario pertenece al equipo, cuando va agregar un evento



 function checkIFManagers(req, res){
     Managers.find({
         user : req.body.user,
         team : req.body.team
     }).exec(function (err, records) {
        if(err){ res.serverError(err); return; }
        if( records.length === 0){
            checkIFPlayers(req, res)
        }else{
            saveEvent(req, res);
        }
    });
 }


 function checkIFPlayers(req, res){
    Players.find({
        user : req.body.user,
        team : req.body.team
    }).exec(function (err, records) {
       if(err){ res.serverError(err); return; }
       if( records.length === 0){
        checkIFParents(req, res)
       }else{
           saveEvent(req, res);
       }
   });
}

function checkIFParents(req, res){
    Parents.find({
        user : req.body.user
    }).populate("childs",
        {
            user: req.body.user
        })
    .exec(function (err, records) {
       if(err){ res.serverError(err); return; }
       if( records.length === 0){
           res.json({ message : "user not permission"});
       }else{
           saveEvent(req, res)
       }
   });
}

function saveEvent(req, res){
    Event.create({
        team : req.body.team,
        name : req.body.name,
        shortLabel : req.body.shortLabel,
        repeats : req.body.repeats,
        dateTime : require('moment')(req.body.dateTime, 'MM/DD/YYYY hh:mm:ss a').toISOString(),
        attendeceTracking : req.body.attendeceTracking,
        notifyTeam : req.body.notifyTeam,
        optionalInfo : req.body.optionalInfo,
        user : req.body.user
    }, (error, event)=>{
        if (error) { return res.serverError(error); }

        LocationEvent.create({
            event : event.id,
            name : req.body.locationName,
            address : req.body.address,
            link : req.body.link,
            detail : req.body.detail
        }, (err, location)=>{
            if (err) { return res.serverError(err); return; }

            res.json({
                event,
                location
            })
        })
    })
}


function getXTeam(req, res){
    Event.find({
        team : req.params.id,
        dateTime : { '>': require('moment')(req.params.date, "MM-DD-YYYY-hh:mm:ss-a").toISOString() }
    })
    .populate("location")
    .exec(function(err, events){
        if (err) { return res.serverError(err); return; }

        res.json(events);
    })
}

module.exports = {
    newEvent : checkIFManagers,
    getXTeam,
    uploadImage: function(req, res){
        if( !req.body.hasOwnProperty("image") ){
            res.json({ message : "not image" });
            return;
        }
        
        let base64 = req.body.image.replace(/^data:image\/jpeg;base64,/, "");

        let fs = require('fs')
        let path = require("path");

        let directory = path.resolve(__dirname, "../../assets/images/players/");

        //create directory if not exists
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }
        console.log(path.join(directory, req.body.id+".jpg"));

        require("fs").writeFile(path.join(directory, req.body.id+".jpg"), base64, 'base64', function(err) {
            
            if(err){
             return res.serverError(err);
            }

            res.json({
              message : "success"
            });

        });

        return;
      },
    getImage: function(req, res){
      const fs = require('fs');
      let path = require("path");

      let directory = path.resolve(__dirname, "../../assets/images/players/");

      if ( !fs.existsSync(path.join(directory, req.params.id+".jpg") ) ){

        res.json({
          message : "not exist file"
        });

        return;
      }

      // read binary data
      var data = 'data:image/jpeg;base64,'+ fs.readFileSync(path.join(directory, req.params.id+".jpg")).toString('base64');

      // convert binary data to base64 encoded string
      res.json({ data })
    
    },

    deleteImage: function(req, res){
        const fs = require('fs');
        let path = require("path");
  
        let directory = path.resolve(__dirname, "../../assets/images/players/");

        fs.unlink(path.join(directory, req.params.id+ ".jpg"), (err) => {
            if (err){ throw err; return; };
            res.json({ message : "success" })
        });
    }
    
};

