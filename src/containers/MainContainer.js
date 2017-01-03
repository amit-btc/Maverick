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
const switchEnvironment = Environment.switchEnvironment;
const option = Environment.option;
const constants = Environment.constants;
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
  setMemory(memory) {

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
        if (Object.keys(res.memory).length > 0 && Object.keys(res.memory)[0] == 'location') {
          let location = res.memory['location'].raw;
          fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=07d11b7d2f0b3b1bc552168515dd9016', {
            method: 'GET'
          }).then(function(response) {
            return response.json();
          }).then(function(j) {
            // Yay, `j` is a JavaScript object
            console.log(j);
            let weatherOutput = "";
            for (var i in j.main) {
              weatherOutput += i + " : " + j.main[i] + "\n"
            }
            weatherOutput = JSON.parse(JSON.stringify(weatherOutput))
            this.setState({
              messageThread: [...this.state.messageThread, {
                type: 'bot',
                data: weatherOutput
              }],
            })
          }.bind(this));
        }
      }.bind(this));
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
