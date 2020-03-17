import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import Search from './Search';
import WidgetList from './List';

export default class PublicWidgets extends React.PureComponent {
  static propTypes = {
    fetchWidgets: PropTypes.func.isRequired,
    searchWidgets: PropTypes.func.isRequired,
    setWidgetSearchTerm: PropTypes.func.isRequired,
    toggleCreateWidgetModal: PropTypes.func.isRequired,
    widget: PropTypes.object.isRequired,
    global: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      term: props.widget.widgetSearchTerm
    }
  }

  onSetTerm = term => this.setState({ term });

  onSearch = () => {
    this.props.setWidgetSearchTerm(this.state.term);
    this.props.searchWidgets(this.state.term);
  }

  onClickUser = id => {
    this.props.fetchUserWidgets(id);
  }

  render() {
    const {
      global: {
        currentUser
      },
      widget: {
        isFetchingWidgets,
        widgets
      },
      toggleCreateWidgetModal
    } = this.props;

    if (isFetchingWidgets) {
      return (
        <>
          <Search searchWidgets={this.onSearch} widgetSearchTerm={this.state.term} setWidgetSearchTerm={this.onSetTerm} isDisabled />
          <LinearProgress variant="query" color="secondary" />
        </>
      );
    }

    return (
      <div>
        <div className="search-bar-create-container">
          <Search searchWidgets={this.onSearch} widgetSearchTerm={this.state.term} setWidgetSearchTerm={this.onSetTerm} />
          {
            currentUser ? (
              <Button variant="outlined" color="primary" onClick={toggleCreateWidgetModal} className="create-widget-button">
                Create Widget
              </Button>
            ) : null
          }
        </div>
        {
          widgets.length === 0 ? (
            <div>No Widgets to display...</div>
          ) : (
              <WidgetList
                widgets={widgets}
                shouldLinkToUser
                onClickUser={this.onClickUser}
              />
            )
        }
      </div>
    );
  }
}