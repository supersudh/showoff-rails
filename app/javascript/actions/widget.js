import axios from 'axios';
import { stopSubmit, setSubmitSucceeded } from 'redux-form';

import {
  getAuthDetails,
} from '../helpers/localStorage';

import constants from '../constants/widgets';

export const fetchWidgets = () => {
  return async dispatch => {
    dispatch({ type: constants.FETCH_WIDGETS });
    try {
      const { data: { widgets: payload } } = await axios.get(`${window.location.origin}/v1/widgets`);
      return dispatch({ type: constants.SET_WIDGETS, payload });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserWidgets = (userId, term = '') => async (dispatch, getState) => {
  dispatch({ type: constants.TOGGLE_IS_FETCHING_USER_WIDGETS });
  try {
    const {
      global: {
        currentUser
      }
    } = getState();
    const formattedUserId = userId === 'me' ? currentUser.user.id : userId;
    let url = '';
    if (term) {
      url = `${window.location.origin}/v1/users/${formattedUserId}/widgets/search/${term}`;
    } else {
      url = `${window.location.origin}/v1/users/${formattedUserId}/widgets`;
    }
    const { data: { data: { widgets: payload } } } = await axios.get(url);
    dispatch({ type: constants.SET_USER_WIDGETS, payload });
  } catch (error) {
    console.log('Error in fetchUserWidgets', error);
  }
  dispatch({ type: constants.TOGGLE_IS_FETCHING_USER_WIDGETS });
};

export const setUserWidgetSearchTerm = term => dispatch => dispatch({
  type: constants.SET_USER_WIDGET_SEARCH_TERM, payload: term
});

export const searchWidgets = (term) => {
  return async dispatch => {
    dispatch({ type: constants.FETCH_WIDGETS });
    try {
      const { data: { widgets: payload } } = await axios.get(`${window.location.origin}/v1/widgets/search?term=${term}`);
      return dispatch({ type: constants.SET_WIDGETS, payload });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setWidgetSearchTerm = term => dispatch => dispatch({
  type: constants.SET_WIDGET_SEARCH_TERM, payload: term
});

// MODALS
export const toggleCreateWidgetModal = () => dispatch => dispatch({ type: constants.TOGGLE_IS_CREATE_WIDGET_MODAL_OPEN });
export const toggleUpdateWidgetModal = updatingWidget => dispatch => dispatch({ type: constants.TOGGLE_IS_UPDATE_WIDGET_MODAL_OPEN, payload: updatingWidget });
export const toggleCreatingWidget = () => dispatch => dispatch({ type: constants.TOGGLE_IS_CREATING_WIDGET });
export const toggleUpdatingWidget = () => dispatch => dispatch({ type: constants.TOGGLE_IS_UPDATING_WIDGET });

export const onSubmitCreateWidgetForm = values => async dispatch => {
  dispatch(toggleCreatingWidget());
  try {
    const localAuthDetails = getAuthDetails();
    const Authorization = 'Bearer '.concat(localAuthDetails.access_token);
    const body = {
      widget: {
        ...values, kind: values.kind ? 'visible' : 'hidden'
      }
    };
    const { data: { data: { widget } } } = await axios.post(`${window.location.origin}/v1/widgets`, body, { headers: { Authorization } });
    dispatch({ type: constants.ON_CREATE_NEW_WIDGET, payload: widget });
    dispatch(setSubmitSucceeded('SignupForm'));
    dispatch(toggleCreateWidgetModal());
  } catch (error) {
    console.log('Error in onSubmitCreateWidgetForm', error);
  }
  dispatch(toggleCreatingWidget());
};

export const onSubmitUpdateWidgetForm = values => async dispatch => {
  dispatch(toggleUpdatingWidget());
  try {
    const localAuthDetails = getAuthDetails();
    const Authorization = 'Bearer '.concat(localAuthDetails.access_token);
    const body = {
      widget: {
        name: values.name,
        description: values.description
      }
    };
    const { data: { data: { widget } } } = await axios.put(`${window.location.origin}/v1/widgets/${values.id}`, body, { headers: { Authorization } });
    dispatch({ type: constants.ON_UPDATE_WIDGET, payload: widget });
    dispatch(setSubmitSucceeded('UpdateWidgetForm'));
    dispatch(toggleUpdateWidgetModal());
  } catch (error) {
    console.log('Error in onSubmitUpdateWidgetForm', error);
  }
  dispatch(toggleUpdatingWidget());
};

export const onDeleteWidget = widget => async dispatch => {
  try {
    dispatch({ type: constants.ON_DELETE_WIDGET, payload: widget.id });
    const localAuthDetails = getAuthDetails();
    const Authorization = 'Bearer '.concat(localAuthDetails.access_token);
    await axios.delete(`${window.location.origin}/v1/widgets/${widget.id}`, { headers: { Authorization } });
  } catch (error) {
    console.log('Error in onDeleteWidget', error);
  }
}
// End MODALS