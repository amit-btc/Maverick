// import { Client } from 'recastai'
var botEnv = require('./botEnv')
var Config = botEnv.Config


// star wars ced110ab8fafa5070379f160fec2774f
// maverick c63577f259945a707d98337b586c5822x
var client;
const constants = {
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
const agent = require('superagent-promise')(require('superagent'), Promise);

client.setMemory = function(conversationToken, memory) {
  return new Promise((resolve, reject) => {
    agent('PUT', constants.CONVERSE_ENDPOINT)
      .set('Authorization', `Token ${token}`)
      .send({
        conversation_token: conversationToken,
        memory
      })
      .then(res => resolve(res.body.results))
      .catch(err => reject(err))
  })
}

client.getMemory = alias => alias ? this.memory[alias] : this.memory
// star wars
// weather news jokes
// cats
// dogs

export default client;