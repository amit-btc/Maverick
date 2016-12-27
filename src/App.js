import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import apiAi from './helpers/api_auth'
class App extends Component {
  fetchData() {
    apiAi.init()
  }
  componentWillMount() {
    this.fetchData()
  }
  render() {
    return (
      <div>
      </div>
      );
  }
}
export default App;
