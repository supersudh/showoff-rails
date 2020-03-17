import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import * as globalActions from '../../actions/global';

import RootDrawer from '../../components/Drawer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Widget from './components/Widget';

class AppRoot extends Component {
  static propTypes = {
    checkAuth: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    fetchWidgets: PropTypes.func.isRequired,
    searchWidgets: PropTypes.func.isRequired,
    setWidgetSearchTerm: PropTypes.func.isRequired,
    // forms
    onSubmitRegisterForm: PropTypes.func.isRequired,
    onSubmitLoginForm: PropTypes.func.isRequired,
    onSubmitChangePasswordForm: PropTypes.func.isRequired,
    onSubmitForgotPasswordForm: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.checkAuth();
  }

  render() {
    console.log(this.props);
    const classes = this.props.classes;
    return (
      <div>
        <RootDrawer
          global={this.props.global}
          onLogout={this.props.onLogout}
        >
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <div className="main-content">
              <Switch>
                <Route exact path="/widgets">
                  <Widget
                    fetchWidgets={this.props.fetchWidgets}
                    searchWidgets={this.props.searchWidgets}
                    setWidgetSearchTerm={this.props.setWidgetSearchTerm}
                    widgets={this.props.global.widgets}
                    isFetchingWidgets={this.props.global.isFetchingWidgets}
                    widgetSearchTerm={this.props.global.widgetSearchTerm}
                  />
                </Route>

                <Route path="/login">
                  <LoginForm
                    onSubmit={(values) => this.props.onSubmitLoginForm(values)}
                  />
                </Route>

                <Route path="/register">
                  <SignupForm
                    onSubmit={this.props.onSubmitRegisterForm}
                  />
                </Route>

                <Route path="/change_password">
                  <ChangePasswordForm
                    onSubmit={this.props.onSubmitChangePasswordForm}
                  />
                </Route>

                <Route path="/forgot_password">
                  <ForgotPasswordForm
                    onSubmit={this.props.onSubmitForgotPasswordForm}
                  />
                </Route>
              </Switch>
            </div>
          </main>
        </RootDrawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  global: state.global,
})

const mapDispatchToProps = bindActionCreators.bind(this, globalActions);

const styles = theme => {
  return {
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(5),
    },
  }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const _withStyles = withStyles(styles);

export default compose(
  withConnect,
  withRouter,
  _withStyles
)(AppRoot);
