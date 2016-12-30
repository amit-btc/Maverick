import React from 'react';
import ChatContainer from './ChatContainer';
import nlp from 'nlp_compromise';
import RepresentationContainer from './RepresentationContainer';
import SampleInputsContainer from './sampleInputsContainer';
// Not using wit because cross-browser-requests -_- ; Also I dont want to render server side.
// import Client from '../helpers/InitializeWit'
import Client from '../helpers/InitializeRecast'

export default class MainContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      messageThread: [],
      userInput: null,
      nlpOutput: null
    }
    this.sessionId = Date.now().toString();
    this.conversation_token = null;
    this.memory = {};
  }
  getResponse() {
    Client.converseRequest(this.state.userInput, {
      conversationToken: this.conversation_token
    })
      .then(function(res) {
        console.log(res);
        this.conversation_token = res.conversation_token;
        this.memory = {
          ...res.memory
        }
        if (res.replies && res.replies.length > 0) {
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
  //   .end(function(err, res) {
  //   if (res.action && res.action.done) {
  //     // Do some things, like call an external API...
  //   }
  // })
  // .end(function(err, res) {
  //   console.log(res.replies[0])
  // })
  }
  updateUserInput(value) {
    if (value !== this.state.userInput) {
      let userInputObject = {
        type: 'user',
        data: value
      };
      this.setState({
        messageThread: [...this.state.messageThread, userInputObject],
        userInput: value
      }, this.getResponse);
    }
  }
  render() {
    return (
      <div>
        <div className="main-header" />
        <div className="card card-3">
          <div className="mdl-grid main-grid">
            <div className="mdl-cell mdl-cell--7-col">
              <ChatContainer
                             messageThread={ this.state.messageThread }
                             userInput={ this.state.userInput }
                             nlpOutput={ this.state.nlpOutput }
                             onChange={ (value) => {
                                          this.updateUserInput(value)
                                        } } />
            </div>
            <div className="mdl-cell mdl-cell--5-col">
              <RepresentationContainer
                                       nlpOutput={ this.state.nlpOutput }
                                       userInput={ this.state.userInput } />
            </div>
          </div>
          <SampleInputsContainer />
        </div>
      </div>
      );
  }
}
