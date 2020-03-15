import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: '1rem'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function WidgetSearch(props) {
  const classes = useStyles();
  const {
    searchWidgets,
    widgetSearchTerm,
    setWidgetSearchTerm,
    isDisabled
  } = props;
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search For Widgets"
        inputProps={{ 'aria-label': 'Search For Widgets' }}
        value={widgetSearchTerm}
        onChange={evt => isDisabled ? false : setWidgetSearchTerm(evt.target.value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton} aria-label="search"
        onClick={() => isDisabled ? false : searchWidgets(widgetSearchTerm)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

WidgetSearch.propTypes = {
  searchWidgets: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  setWidgetSearchTerm: PropTypes.func.isRequired,
  widgetSearchTerm: PropTypes.string.isRequired,
};

export default WidgetSearch;