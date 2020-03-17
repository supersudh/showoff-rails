import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import WidgetsIcon from '@material-ui/icons/Widgets';
import EmailIcon from '@material-ui/icons/Email';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

function NonAuthenticatedActions({ history }) {
  return [
    { label: 'Widgets', path: '/widgets', Icon: WidgetsIcon },
    { label: 'Login', path: '/login', Icon: LockOpenIcon },
    { label: 'Register', path: '/register', Icon: PersonAddIcon },
    { label: 'Forgot Password', path: '/forgot_password', Icon: EmailIcon }
  ].map(({ label, path, Icon }, i) => (
    <ListItem button onClick={() => history.push(path)} key={`naa_${i}`}>
      <ListItemIcon><Icon /></ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  ));
}

function AuthenticatedActions({ history, fetchUserWidgets }) {
  return [
    { label: 'Widgets', path: '/widgets', Icon: WidgetsIcon },
    {
      label: 'My Widgets', path: '/widgets/user/me', Icon: WidgetsIcon, customOnClick: () => {
        fetchUserWidgets('me');
        history.push('/widgets/user/me');
      }
    },
    { label: 'Change Password', path: '/change_password', Icon: LockOpenIcon },
  ].map(({ label, path, Icon, customOnClick }, i) => (
    <ListItem button onClick={() => customOnClick ? customOnClick() : history.push(path)} key={`aa_${i}`}>
      <ListItemIcon><Icon /></ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  ));
}

function RootDrawer(props) {
  const classes = useStyles();
  const {
    global: {
      currentUser
    },
    history,
    fetchUserWidgets
  } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Showoff App {currentUser ? <span style={{ color: 'springgreen' }}>{`(Welcome, ${currentUser.user.name})`}</span> : null}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {currentUser ? <AuthenticatedActions history={history} fetchUserWidgets={fetchUserWidgets} /> : <NonAuthenticatedActions history={history} />}
        </List>
        <Divider />
        <List>
          {currentUser ? (
            <ListItem button onClick={props.onLogout}>
              <ListItemIcon><LockOpenIcon /></ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          ) : null}
        </List>
      </Drawer>
      {props.children}
    </div>
  );
}

RootDrawer.propTypes = {
  global: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  onLogout: PropTypes.func.isRequired,
  fetchUserWidgets: PropTypes.func.isRequired,
};

export default withRouter(RootDrawer);