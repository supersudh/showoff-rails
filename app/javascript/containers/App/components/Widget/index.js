import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

import Search from './Search';
import WidgetList from './List';

export default class Widget extends Component {
  static propTypes = {
    fetchWidgets: PropTypes.func.isRequired,
    searchWidgets: PropTypes.func.isRequired,
    setWidgetSearchTerm: PropTypes.func.isRequired,
    widgetSearchTerm: PropTypes.string.isRequired,
    widgets: PropTypes.array.isRequired,
    isFetchingWidgets: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    props.fetchWidgets();
  }

  render() {
    const {
      widgetSearchTerm,
      setWidgetSearchTerm,
      searchWidgets,
      isFetchingWidgets,
      widgets
    } = this.props;
    if (isFetchingWidgets) {
      return (
        <>
          <Search searchWidgets={searchWidgets} widgetSearchTerm={widgetSearchTerm} setWidgetSearchTerm={setWidgetSearchTerm} isDisabled />
          <LinearProgress variant="query" color="secondary" />
        </>
      );
    }
    if (widgets.length === 0) {
      return (
        <>
          <Search searchWidgets={searchWidgets} widgetSearchTerm={widgetSearchTerm} setWidgetSearchTerm={setWidgetSearchTerm} />
          <div>No Widgets to display...</div>
        </>
      );
    }
    return (
      <div>
        <Search searchWidgets={searchWidgets} widgetSearchTerm={widgetSearchTerm} setWidgetSearchTerm={setWidgetSearchTerm} />
        <WidgetList widgets={this.props.widgets} />
      </div>
    )
  }
}
