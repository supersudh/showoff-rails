import React from "react"
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from '../../configureStore';

import AppRoot from './AppRoot';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppRoot />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
