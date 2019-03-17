import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import storeConfig from './redux/configStore';

const store = storeConfig();

const title = 'My Minimal React Webpack Babel Setup';


render(
  <Provider store={store}>
    <div>{title}</div>
  </Provider>,
  document.getElementById('app')
);
