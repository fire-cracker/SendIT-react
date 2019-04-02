import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import storeConfig from './redux/configStore';
import Routes from './Route';
import './views/style.css';
import 'react-toastify/dist/ReactToastify.css';


const store = storeConfig();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
