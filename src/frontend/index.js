import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './app/app';
import registerServiceWorker from './registerServiceWorker';

import './style/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
