import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

import { mainStore } from './stores';

ReactDOM.render(
  <App store={mainStore} />,
  document.getElementById('root')
);
