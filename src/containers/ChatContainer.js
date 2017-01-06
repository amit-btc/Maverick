import React from 'react';
// import Immutable from 'immutable';
import ChatFeed from '../components/ChatFeed'
export default class chatContainer extends React.Component {

  constructor(props) {
    super(props);
  }
  updateParentState() {
    let userInputValue = document.getElementById('userinput').value;
    //validation will go here
    if (userInputValue.length > 0) {
      this.props.onChange(userInputValue)
      document.getElementById('userinput').value = ""
    }
    else return
  }
  handleFormSubmit(event) {
    event.preventDefault();
    this.updateParentState();
  }
  componentWillReceiveProps(nextProps) {
    // try to perform deep comparison here 
    // if(this.state.props!)

  }

  render() {
    return (
      <div>
        <div className="chat-box">
          <ChatFeed {...this.props}/>
        </div>
        <form onSubmit={ (event) => this.handleFormSubmit(event) }>
          <div
               className="mdl-textfield mdl-js-textfield user-input-div"
               id="user-input-div">
            <input
                   className="mdl-textfield__input"
                   type="text"
                   id="userinput"
                   ref="userinput" />
            <label
                   className="mdl-textfield__label"
                   htmlFor="userinput">
              Type text here...
            </label>
          </div>
          <button
                  className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--primary submit-button"
                  type="submit"
                  id="submit-button">
            <i className="material-icons">send</i>
          </button>
        </form>
      </div>
      );
  }
}
