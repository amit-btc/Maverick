import React from 'react';

export default class ChatFeed extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.ChatBubbles
  }
  componentWillReceiveProps(nextProps) {
    this.ChatBubbles = nextProps.messageThread.map((item, key) => {
      if (item.data) {
        return (<div
                     className={ "chat-bubble " + item.type }
                     key={ key }>
                  <div className="talktext">
                    { item.data }
                  </div>
                </div>);
      }
    });
  }
  render() {
    return (
      <div>
        { this.ChatBubbles }
      </div>
      );
  }
}
