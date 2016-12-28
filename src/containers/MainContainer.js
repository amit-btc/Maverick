import React from 'react';
import ChatContainer from './ChatContainer';
import nlp from 'nlp_compromise';
import RepresentationContainer from './RepresentationContainer';
import SampleInputsContainer from './sampleInputsContainer';
import Client from '../helpers/InitializeWit'


export default class MainContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      messageThread: [],
      userInput: null,
      nlpOutput: null
    }
    this.sessionId = Date.now().toString();

  }
  getResponse() {
    Client.runActions(this.sessionId, this.state.userInput, {})
      .then((data) => {
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
        let botOutputObject = {
          type: 'bot',
          data: data.msg
        };

        this.setState({
          messageThread: [...this.state.messageThread, botOutputObject],
          nlpOutput: data.msg
        })
      })
      .catch(console.error);
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
