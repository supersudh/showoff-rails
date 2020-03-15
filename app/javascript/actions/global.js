import axios from 'axios';

import {
  getAuthDetails,
  storeAuthDetails,
  removeAuthDetails
} from '../helpers/localStorage';

import constants from '../constants/global';

export const checkAuth = () => {
  return async dispatch => {
    try {
      const localAuthDetails = getAuthDetails();
      if (localAuthDetails) {

      } else {
        dispatch({ type: constants.SET_CURRENT_USER, payload: null });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

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