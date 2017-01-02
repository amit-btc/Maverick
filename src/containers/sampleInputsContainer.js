import React from 'react';

export default class sampleInputsContainer extends React.Component {

  constructor(props) {
    super(props);
  }
  fillInput(value) {
    this.props.fillInput(value.target.textContent);
  }
  render() {
    const sampleInput = this.props.config.sampleInput;
    const elements = sampleInput.map((item, index) => {
      return (
        <button
                type="button"
                className="mdl-chip sample-item"
                key={ index }
                onClick={ (event) => this.fillInput(event) }>
          <span className="mdl-chip__text">{ item }</span>
        </button>)
    });
    return (
      <div>
        <div className="sample-input-block">
          { elements }
        </div>
      </div>
      );
  }
}
