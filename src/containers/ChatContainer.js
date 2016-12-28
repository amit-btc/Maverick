import React from 'react';
import Immutable from 'immutable';
import ChatFeed from '../components/ChatFeed'
export default class chatContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  handleFormSubmit(event) {
    let userInputValue = document.getElementById('userinput').value;
    event.preventDefault();
    //validation will go here
    if (userInputValue.length > 0) {
      this.props.onChange(userInputValue)
    }
    else return
  }
  componentWillReceiveProps(nextProps) {
    // try to perform deep comparison here 
    // if(this.state.props!)
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <div>
        <h6>Chat</h6>
        <div className="chat-box">
          <ChatFeed {...this.props}/>
        </div>
        <form onSubmit={ (event) => {
                           this.handleFormSubmit(event)
                         
                         } }>
          <div className="mdl-textfield mdl-js-textfield user-input-div">
            <input
                   className="mdl-textfield__input"
                   type="text"
                   id="userinput" />
            <label
                   className="mdl-textfield__label"
                   htmlFor="userinput">
              Orders, Captain ?
            </label>
          </div>
          <button
                  className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--primary submit-button"
                  type="submit">
            <i className="material-icons">send</i>
          </button>
        </form>
      </div>
      );
  }
}
