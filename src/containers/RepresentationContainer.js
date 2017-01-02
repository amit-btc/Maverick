import React from 'react';
var allConfig = require('../helpers/botEnv').allConfig
export default class RepresentationContainer extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };
  constructor(props) {
    super(props);
  }
  handleSelectClick(event, key) {
    this.props.switchEnvironmentContext(key);
  }
  render() {
    return (
      <div className="mdl-grid">
        <div className="demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col">
          <div className="mdl-card__title mdl-card--expand maverick">
            <h2 className="mdl-card__title-text">Maverick</h2>
          </div>
          <div className="mdl-card__supporting-text">
            { allConfig['maverick'].description }
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a
               className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
               onClick={ (event) => this.handleSelectClick(event, 'maverick') }>Select</a>
          </div>
        </div>
        <div className="demo-card-square mdl-card mdl-shadow--2dp  mdl-cell mdl-cell--6-col">
          <div className="mdl-card__title mdl-card--expand star-wars">
            <h2 className="mdl-card__title-text">Star Wars</h2>
          </div>
          <div className="mdl-card__supporting-text">
            { allConfig['star-wars'].description }
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a
               className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
               onClick={ (event) => this.handleSelectClick(event, 'star-wars') }>Select</a>
          </div>
        </div>
        <div className="demo-card-square mdl-card mdl-shadow--2dp  mdl-cell mdl-cell--6-col">
          <div className="mdl-card__title mdl-card--expand cats">
            <h2 className="mdl-card__title-text">Cats</h2>
          </div>
          <div className="mdl-card__supporting-text">
            { allConfig['cats'].description }
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a
               className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
               onClick={ (event) => this.handleSelectClick(event, 'cats') }>Select</a>
          </div>
        </div>
        <div className="demo-card-square mdl-card mdl-shadow--2dp  mdl-cell mdl-cell--6-col">
          <div className="mdl-card__title mdl-card--expand dogs">
            <h2 className="mdl-card__title-text">Dogs</h2>
          </div>
          <div className="mdl-card__supporting-text">
            { allConfig['dogs'].description }
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a
               className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
               onClick={ (event) => this.handleSelectClick(event, 'dogs') }>Select</a>
          </div>
        </div>
      </div>
      );
  }
}
