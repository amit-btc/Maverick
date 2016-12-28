const {Wit, log} = require('node-wit');
// const AppId = '584fb521-0bf4-4f37-970a-a1832bd805b6';
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
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    console.log('sending...', JSON.stringify(response));
  },
  getForecast({context, entities}) {
    var location = firstEntityValue(entities, 'location');
    if (location) {
      context.msg = 'sunny in ' + location; // we should call a weather API here
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.msg;
    }
    return context;
  },
};

const client = new Wit({
  accessToken: ServerAccessToken,
  actions: actions,
  logger: new log.Logger(log.DEBUG) // optional
});


export default client;