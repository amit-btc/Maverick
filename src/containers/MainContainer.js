import React from 'react';
import ChatContainer from './ChatContainer';
import nlp from 'nlp_compromise';
import RepresentationContainer from './RepresentationContainer';
import SampleInputsContainer from './sampleInputsContainer';
var giphy = require('giphy-api')();
var Client = require('recastai-lib-browser')
var _ = require('underscore');
var Environment = require('../helpers/botEnv')
var config = Environment.Config;
var switchEnvironment = Environment.switchEnvironment;

const option = {
  language: 'en', /* 'en' or 'fr' */
  debug: true, /*will add console log at the end of some function */
  conversationToken: '', /*Conversation token*/
}
var token = config.token;
export default class MainContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      messageThread: [],
      userInput: null,
      nlpOutput: null,
      config: config
    }
    this.sessionId = Date.now().toString();
    this.conversation_token = null;
    this.memory = {};
    this.client = new Client(token, option);
  }
  getMemory(alias) {
    this.client.getMemory = alias => alias ? this.memory[alias] : this.memory
  }
  setMemory(memory) {
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

    return new Promise((resolve, reject) => {
      agent('PUT', constants.CONVERSE_ENDPOINT)
        .set('Authorization', `Token ${this.state.config.token}`)
        .send({
          conversation_token: this.conversation_token,
          memory
        })
        .then(res => resolve(res.body.results))
        .catch(err => reject(err))
    })
  }
  getResponse() {
    let memoryUpdateFlag = false;
    this.client.converseRequest(this.state.userInput, {
      conversationToken: this.conversation_token
    })
      .then(function(res) {
        if (!this.conversation_token)
          this.conversation_token = res.conversation_token;
        if (_.isEmpty(this.memory)) {
          this.memory = {
            ...res.memory
          }
        } else {
          for (var i in this.memory) {
            if (res.memory[i]) {
              this.memory[i] = Object.assign({}, res.memory[i])
              memoryUpdateFlag = true;
            }
          }
        }
        if (memoryUpdateFlag) {
          this.setMemory(this.memory).then((res) => {
            console.log(res)
          });
        }
        if (this.state.userInput == 'gif' || this.state.userInput == 'gifs') {
          if (res.entities && 'action' in res.entities && res.entities['action'].length > 0 && res.entities['action'][0].value == 'gif') {
            giphy.random({
              tag: this.state.config.value,
              rating: 'g',
              limit: 1
            }, function(err, res) {
              // Res contains gif data!

              let botOutputObject = {
                type: 'bot',
                data: res.data.image_url
              };
              this.setState({
                messageThread: [...this.state.messageThread, botOutputObject]
              })
            }.bind(this));
          }
        } else if (res.replies && res.replies.length > 0) {
          res.replies.map((item) => {
            let botOutputObject = {
              type: 'bot',
              data: item
            };
            this.setState({
              messageThread: [...this.state.messageThread, botOutputObject],
              nlpOutput: item
            })
          });
        }
      }.bind(this))
  }
  updateUserInput(value) {
    let userInputObject = {
      type: 'user',
      data: value
    };
    this.setState({
      messageThread: [...this.state.messageThread, userInputObject],
      userInput: value
    }, this.getResponse);
  }
  switchEnvironmentContext(value) {
    let newConfig = {};
    this.client = null;
    this.memory = null;
    newConfig = switchEnvironment(value);
    this.setState({
      config: newConfig,
      messageThread: []
    }, () => this.client = new Client(newConfig.token, option))
    if (this.conversation_token) {
      this.conversation_token = null;
    }
  }
  fillInput(value) {
    document.getElementById('userinput').value = value;
    document.getElementById('user-input-div').className += ' is-dirty'
    document.getElementById('submit-button').click()
  }
  render() {
    return (
      <div>
        <div className="main-header" />
        <div className="card card-3">
          <div className="mdl-grid main-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <h4 className="chat-heading-title">{ this.state.config.heading }</h4>
              <ChatContainer
                             messageThread={ this.state.messageThread }
                             userInput={ this.state.userInput }
                             nlpOutput={ this.state.nlpOutput }
                             onChange={ (value) => {
                                          this.updateUserInput(value)
                                        } } />
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h4 className="rep-heading">Switch Bot Environment</h4>
              <RepresentationContainer
                                       nlpOutput={ this.state.nlpOutput }
                                       userInput={ this.state.userInput }
                                       switchEnvironmentContext={ (value) => this.switchEnvironmentContext(value) } />
            </div>
          </div>
          <div className="sample-input-block">
            <h4 className="sample-input-heading">Try one of these Inputs</h4>
            <SampleInputsContainer
                                   config={ this.state.config }
                                   fillInput={ (value) => this.fillInput(value) } />
          </div>
        </div>
      </div>
      );
  }
}
