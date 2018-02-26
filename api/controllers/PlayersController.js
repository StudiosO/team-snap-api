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
    },
    uploadImage: function (req, res) {
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

