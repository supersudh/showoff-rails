import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import PublicWidgets from './PublicWidgets';
import UserWidgets from './UserWidgets';

class Widget extends Component {
  constructor(props) {
    super(props);
    props.fetchWidgets();
  }

  componentWillUnmount() {
    this.props.setWidgetSearchTerm('');
    this.props.setUserWidgetSearchTerm('');
  }

  render() {
    return (
      <Switch>
        <Route exact path="/widgets" component={routeProps => <PublicWidgets {...this.props} {...routeProps} />} />
        <Route exact path="/widgets/user/:id" component={routeProps => <UserWidgets {...this.props} {...routeProps} />} />
      </Switch>
    );
  }
}

export default withRouter(Widget);