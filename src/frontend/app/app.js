/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MatrixView from './../components/matrix';
import defaultStore from './defaultStore';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={defaultStore()}>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to React</h2>
            <h3>does webpack work?</h3>
          </div>
          <MatrixView />
        </div>
      </Provider>
    );
  }
}

export default App;
