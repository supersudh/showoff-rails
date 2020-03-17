import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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

function WidgetListItem({
  widget,
  classes,
  shouldLinkToUser,
  onClickUser,
  isMyPage,
  toggleUpdateWidgetModal,
  onDeleteWidget
}) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={widget.user.name} src={widget.user.images.small_url} />
      </ListItemAvatar>
      <ListItemText
        primary={widget.name}
        secondary={
          <React.Fragment>
            {
              shouldLinkToUser ? (
                <NavLink
                  to={`widgets/user/${widget.user.id}`}
                  onClick={onClickUser.bind(this, widget.user.id)}
                >
                  {widget.user.name}
                </NavLink>
              ) :
                (
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {widget.user.name}
                  </Typography>
                )
            }
            &nbsp;&nbsp;{widget.description}&nbsp;&nbsp;
            {isMyPage ? (
              <Button variant="outlined" color="secondary" onClick={() => toggleUpdateWidgetModal(widget)}>
                EDIT
              </Button>
            ) : null}
            &nbsp;&nbsp;
            {
              isMyPage ? (
                <Button variant="outlined" color="secondary" onClick={() => onDeleteWidget(widget)}>
                  DELETE
                </Button>
              ) : null
            }
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

function WidgetList({
  widgets,
  shouldLinkToUser,
  onClickUser,
  isMyPage,
  toggleUpdateWidgetModal,
  onDeleteWidget
}) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {
        widgets.map((widget, i) => (
          <div key={`widget_${i}`} style={{ width: '100%' }}>
            <WidgetListItem
              widget={widget}
              classes={classes}
              shouldLinkToUser={shouldLinkToUser}
              onClickUser={onClickUser}
              isMyPage={isMyPage}
              toggleUpdateWidgetModal={toggleUpdateWidgetModal}
              onDeleteWidget={onDeleteWidget}
            />
            {i !== widgets.length - 1 ? <Divider variant="inset" component="li" /> : null}
          </div>
        ))
      }
    </List>
  );
}

WidgetList.propTypes = {
  widgets: PropTypes.array.isRequired,
  shouldLinkToUser: PropTypes.bool, // Prop that will indicate if this page displays other user's widgets, hence we can link to that user's widget page
  onClickUser: PropTypes.func,
  isMyPage: PropTypes.bool, // Prop that will indicate if this page only contains current user's widget. So, we can allow edit
  toggleUpdateWidgetModal: PropTypes.func,
  onDeleteWidget: PropTypes.func,
};

export default withRouter(WidgetList);