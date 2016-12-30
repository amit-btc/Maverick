var fetch = require('node-fetch');
var Wit = require('node-wit/lib/wit');
var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var uuid = require('node-uuid');

var app = express();

const path = require('path');


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
// Server frontpage
app.get('/', function(req, res) {
  res.send('This is TestBot Server');
});

