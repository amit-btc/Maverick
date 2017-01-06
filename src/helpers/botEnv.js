var config = {};
var allConfig = {
  'cats': {
    token: '3e7b71cbbe742f1ee36ad8f10e6c7928',
    value: 'cats',
    heading: 'Cats',
    sampleInput: ["meow", "gif"],
    description: 'Exchange meows with my cat and enjoy cat gifs.'
  },
  'maverick': {
    token: 'c63577f259945a707d98337b586c5822',
    value: 'maverick',
    heading: 'Maverick',
    sampleInput: ["How's the weather in Chicago ?", "Weather in Mumbai ?", "What's the weather trend in Singapore?", "What is the weather in Bangalore today?"],
    description: 'Supports various weather and forecast requests.'
  },
  'star-wars': {
    token: "ced110ab8fafa5070379f160fec2774f",
    value: 'star-wars',
    heading: 'Star Wars',
    sampleInput: ["Hi!", "from Tatooine", "I from Tatooine", "I am from Alderaan!", "I choose X-Wing.", "You're useless.", "Fuck you", "tell me more about you", "What do you want ?"],
    description: 'Star Wars role playing game. May the force be with you.'
  },
  'dogs': {
    token: '6e183c3bdc01643e0ea1552b63a122b8',
    value: 'dogs',
    heading: 'Dogs',
    sampleInput: ["Woof", "gif"],
    description: 'Bork and gifs!'
  }

}
const switchEnvironment = (value) => {
  switch (value) {
    case 'maverick':
      config = allConfig['maverick'];
      break;
    case 'star-wars':
      config = allConfig['star-wars'];
      break;
    case 'cats':
      config = allConfig['cats'];
      break;
    case 'dogs':
      config = allConfig['dogs'];
      break;
  }
  return config;
}
var option = {
  language: 'en', /* 'en' or 'fr' */
  debug: true, /*will add console log at the end of some function */
  conversationToken: '', /*Conversation token*/
}
var constants = {
  REQUEST_ENDPOINT: 'https://api.recast.ai/v2/request',
  CONVERSE_ENDPOINT: 'https://api.recast.ai/v2/converse',
  WS_ENDPOINT: 'wss://api.recast.ai/v2/request',

  ACT_ASSERT: 'assert',
  ACT_COMMAND: 'command',
  ACT_WH_QUERY: 'wh-query',
  ACT_YN_QUERY: 'yn-query',

  TYPE_ABBREVIATION: 'abbr:',
  TYPE_ENTITY: 'enty:',
  TYPE_DESCRIPTION: 'desc:',
  TYPE_HUMAN: 'hum:',
  TYPE_LOCATION: 'loc:',
  TYPE_NUMBER: 'num:',

  SENTIMENT_VERY_POSITIVE: 'vpositive',
  SENTIMENT_POSITIVE: 'positive',
  SENTIMENT_NEUTRAL: 'neutral',
  SENTIMENT_NEGATIVE: 'negative',
  SENTIMENT_VERY_NEGATIVE: 'vnegative'
}
var defaultConfig = switchEnvironment('maverick');
export { config as Config };
export { switchEnvironment as switchEnvironment };
export { allConfig as allConfig };
export { defaultConfig as defaultConfig };
export { option as option };
export { constants as constants };