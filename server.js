var express = require('express'),
app = express(),
port = process.env.PORT || 3000,

cor=require('cors'),

mongoose = require('mongoose'),
Task = require('./model/structure'),
bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pcdatabase'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cor());


var routes = require('./routes/routes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });




app.listen(port);

console.log('RESTful API server started on: ' + port);