import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';

const store = configureStore();

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
