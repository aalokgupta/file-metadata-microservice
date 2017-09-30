// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var multer = require('multer');
var path = require('path');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dream", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// app.post("/upload", function (request, response) {
//   console.log("file-name " + request.query.dream);
//   response.sendStatus(200);
// });

app.post('/', function (req, res, next) {
  // req.body contains the text fields 
  var upload = multer({ storage: storage}).single('userFile');
  upload(req, res, function(err) {
    if(err){
        console.log(err);
      }
    else{
      // res.end('File is uploaded');
      res.json({"orifinal name": req.file.originalname, 
                "size": req.file.size});
      console.log("file-name = "+req.file);
    }
	});
});


var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		console.log(file)
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});
// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
