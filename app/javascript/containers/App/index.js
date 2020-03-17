import React from "react"
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import '../../stylesheets/react-datepicker.min.css';
import './app_styles.css';
import history from '../../utils/history';
import configureStore from '../../configureStore';

import AppRoot from './AppRoot';

const initialState = {};
const store = configureStore(initialState, history);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRoot />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App
