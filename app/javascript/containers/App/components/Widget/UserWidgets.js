import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import Search from './Search';
import WidgetList from './List';

export default class UserWidgets extends React.PureComponent {
  static propTypes = {
    fetchUserWidgets: PropTypes.func.isRequired,
    setUserWidgetSearchTerm: PropTypes.func.isRequired,
    widget: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    toggleCreateWidgetModal: PropTypes.func.isRequired,
    toggleUpdateWidgetModal: PropTypes.func.isRequired,
    onDeleteWidget: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      term: props.widget.userWidgetSearchTerm
    };
  }

  onSetTerm = term => this.setState({ term });

  onSearch = () => {
    this.props.setUserWidgetSearchTerm(this.state.term);
    this.props.fetchUserWidgets(this.props.match.params.id, this.state.term);
  }

  render() {
    const {
      global: {
        currentUser
      },
      widget: {
        isFetchingUserWidgets,
        userWidgets
      },
      toggleCreateWidgetModal,
      match
    } = this.props;

    const isMyPage = (match.params.id === 'me') || (Number(match.params.id) === (currentUser ? currentUser.user.id : null));
    if (isFetchingUserWidgets) {
      return (
        <>
          <Search searchWidgets={this.onSearch} widgetSearchTerm={this.state.term} setWidgetSearchTerm={this.onSetTerm} isDisabled />
          <LinearProgress variant="query" color="secondary" />
        </>
      );
    }
    return (
      <div>
        <Button onClick={() => this.props.history.goBack()} variant="outlined">Go Back</Button>
        <br />
        <br />
        <div className="search-bar-create-container">
          <Search searchWidgets={this.onSearch} widgetSearchTerm={this.state.term} setWidgetSearchTerm={this.onSetTerm} />
          {
            currentUser && isMyPage ? (
              <Button variant="outlined" color="primary" onClick={toggleCreateWidgetModal} className="create-widget-button">
                Create Widget
              </Button>
            ) : null
          }
        </div>
        {
          userWidgets.length === 0 ? (
            <div>No Widgets to display...</div>
          ) : (
              <WidgetList
                widgets={userWidgets}
                isMyPage={isMyPage}
                toggleUpdateWidgetModal={this.props.toggleUpdateWidgetModal}
                onDeleteWidget={this.props.onDeleteWidget}
              />
            )
        }
      </div>
    );
  }
}