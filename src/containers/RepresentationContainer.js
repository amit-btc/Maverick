import React from 'react';

export default class RepresentationContainer extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.userInput }
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        { this.props.nlpOutput }
      </div>
      );
  }
}
