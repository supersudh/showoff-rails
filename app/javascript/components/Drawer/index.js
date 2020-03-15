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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import WidgetsIcon from '@material-ui/icons/Widgets';

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
    { label: 'Widgets', path: '/', Icon: WidgetsIcon },
    { label: 'Login', path: '/login', Icon: LockOpenIcon },
    { label: 'Register', path: '/register', Icon: PersonAddIcon }
  ].map(({ label, path, Icon }, i) => (
    <ListItem button onClick={() => history.push(path)} key={`naa_${i}`}>
      <ListItemIcon><Icon /></ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  ));
}

function AuthenticatedActions({ history }) {
  return [
    { label: 'Widgets', path: '/', Icon: WidgetsIcon },
    { label: 'Reset Password', path: '/login', Icon: LockOpenIcon },
  ].map(({ label, path, Icon }, i) => (
    <ListItem button onClick={() => history.push(path)} key={`aa_${i}`}>
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
    history
  } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Showoff App
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
          {currentUser ? <AuthenticatedActions history={history} /> : <NonAuthenticatedActions history={history} />}
        </List>
        <Divider />
        <List>
          {currentUser ? (
            <ListItem button>
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
  children: PropTypes.element.isRequired
};

export default withRouter(RootDrawer);