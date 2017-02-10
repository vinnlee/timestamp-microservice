const express = require("express");
const path = require("path");
const moment = require("moment");
const app = express();

app.set('port', process.env.PORT || 3300);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/:datetime', function(req, res) {
    
    var timestamp = req.params.datetime;
    var obj;
    
    if( isNaN( timestamp ) ) {
        var datetime = moment( timestamp, 'MMMM DD, YYYY', true );
        
        if( datetime.isValid() ) {
            obj = {
              "unix": datetime.format('X'),
              "natural": datetime.format('MMM DD, YYYY')
            };
        } else {
            obj = {
                "unix": null,
                "natural": null
            };
        }
        res.json( obj );
        
    } else {
        obj = {
          "unix": moment.unix(timestamp).format('X'),
          "natural": moment.unix(timestamp).format('MMMM DD, YYYY')
        };
        res.json(obj);
    }
    
});

app.listen(app.get('port'));