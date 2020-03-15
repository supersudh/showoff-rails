import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function WidgetListItem({ widget, classes }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={widget.user.name} src={widget.user.images.small_url} />
      </ListItemAvatar>
      <ListItemText
        primary={widget.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {widget.user.name}
            </Typography>
            &nbsp;&nbsp;{widget.description}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

function WidgetList({ widgets }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {
        widgets.map((widget, i) => (
          <div key={`widget_${i}`} style={{ width: '100%' }}>
            <WidgetListItem widget={widget} classes={classes} />
            {i !== widgets.length - 1 ? <Divider variant="inset" component="li" /> : null}
          </div>
        ))
      }
    </List>
  );
}

WidgetList.propTypes = {
  widgets: PropTypes.array.isRequired,
};

export default WidgetList;