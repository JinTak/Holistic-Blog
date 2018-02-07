const express = require('express');
const app = express();
const routes = require('./config/routes');
const path = require('path');
const bodyParser = require('body-parser');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(request, response, next){
  console.log('Hit: ', Date());
	next();
});

if(!process.env.DYNO) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });
}

app.use('/', routes);

app.use(express.static(__dirname + '/front-end/dist'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/front-end/dist/index.html'));
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
	console.log('Listening');
});


