var fetch = require('node-fetch');
var Wit = require('node-wit/lib/wit');
var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var uuid = require('node-uuid');
var morgan = require('morgan')
var app = express();

const path = require('path');

const ServerAccessToken = '5EIBODHPO3N45KAEKD3KAKP6A2JB7PJN';

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
  Array.isArray(entities[entity]) &&
  entities[entity].length > 0 &&
  entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    console.dir(request, response, {
      depth: null
    });
    const text = response.text;
    console.log('sending...', text);
  }
};

const client = new Wit({
  accessToken: ServerAccessToken,
  actions: actions
});

client.runActions(Date.now().toString(), "Yo", {})
  .then((data) => {
    console.dir(data, {
      depth: null
    });
    console.log('Yay, got Wit.ai response: hahah ' + data.msg + JSON.stringify(data));
  })
  .catch(console.error);
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
// Server frontpage
app.get('/', function(req, res) {
  res.send('This is TestBot Server');
});

