import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../configureStore';

import HelloWorld from './HelloWorld';

const store = configureStore();

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => ("Home!")} />
            <Route path="/hello" render={() => <HelloWorld greeting="hardcoded" />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App
