import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import * as globalActions from '../../actions/global';
import * as widgetActions from '../../actions/widget';

import RootDrawer from '../../components/Drawer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Widget from './components/Widget';
import CreateWidgetModal from './components/Widget/CreateWidgetModal';
import UpdateWidgetModal from './components/Widget/UpdateWidgetModal';

class AppRoot extends Component {
  static propTypes = {
    global: PropTypes.object.isRequired,
    widget: PropTypes.object.isRequired,
    checkAuth: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    fetchWidgets: PropTypes.func.isRequired,
    searchWidgets: PropTypes.func.isRequired,
    setWidgetSearchTerm: PropTypes.func.isRequired,
    fetchUserWidgets: PropTypes.func.isRequired,
    onDeleteWidget: PropTypes.func.isRequired,
    // forms
    onSubmitRegisterForm: PropTypes.func.isRequired,
    onSubmitLoginForm: PropTypes.func.isRequired,
    onSubmitChangePasswordForm: PropTypes.func.isRequired,
    onSubmitForgotPasswordForm: PropTypes.func.isRequired,
    onSubmitCreateWidgetForm: PropTypes.func.isRequired,
    onSubmitUpdateWidgetForm: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.checkAuth();
  }

  renderCreateWidgetModal = () => {
    if (this.props.widget.isCreateWidgetModalOpen) {
      return (
        <CreateWidgetModal
          toggleCreateWidgetModal={this.props.toggleCreateWidgetModal}
          onSubmit={this.props.onSubmitCreateWidgetForm}
        />
      );
    }
    return null;
  }

  renderUpdateWidgetModal = () => {
    if (this.props.widget.isUpdateWidgetModalOpen) {
      return (
        <UpdateWidgetModal
          toggleUpdateWidgetModal={this.props.toggleUpdateWidgetModal}
          onSubmit={this.props.onSubmitUpdateWidgetForm}
          initialValues={this.props.widget.updatingWidget}
        />
      );
    }
    return null;
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        {this.renderCreateWidgetModal()}
        {this.renderUpdateWidgetModal()}
        <RootDrawer
          global={this.props.global}
          onLogout={this.props.onLogout}
          fetchUserWidgets={this.props.fetchUserWidgets}
        >
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <div className="main-content">
              <Switch>
                <Route path="/widgets">
                  <Widget
                    fetchWidgets={this.props.fetchWidgets}
                    searchWidgets={this.props.searchWidgets}
                    setWidgetSearchTerm={this.props.setWidgetSearchTerm}
                    fetchUserWidgets={this.props.fetchUserWidgets}
                    setUserWidgetSearchTerm={this.props.setUserWidgetSearchTerm}
                    toggleCreateWidgetModal={this.props.toggleCreateWidgetModal}
                    toggleUpdateWidgetModal={this.props.toggleUpdateWidgetModal}
                    onDeleteWidget={this.props.onDeleteWidget}
                    global={this.props.global}
                    widget={this.props.widget}
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
  widget: state.widget
})

const mapDispatchToProps = bindActionCreators.bind(this, { ...globalActions, ...widgetActions });

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
