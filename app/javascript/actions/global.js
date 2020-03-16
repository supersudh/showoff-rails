import axios from 'axios';

import { stopSubmit, setSubmitSucceeded } from 'redux-form';
import { push, replace } from 'connected-react-router'

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

// FORMS
export const onSubmitRegisterForm = values => async (dispatch, getState) => {
  console.log(values);

  setTimeout(() => {
    dispatch(replace('/'));
  }, 100);
  return false;
  // console.log(getState());
  try {
    // dispatch(startSubmit('SignupForm'));
    const body = values;
    const { data: response } = await axios.post(`${window.location.origin}/v1/users`, body);
    console.log(response);
    if (response.code !== 0) {
      throw { email: response.message };
    } else {
      storeAuthDetails(response.data.token);
      dispatch(setSubmitSucceeded('SignupForm'));
      dispatch(replace('/'));
    }
  } catch (error) {
    setTimeout(() => {
      dispatch(stopSubmit('SignupForm', error));
    }, 100);
    // throw error;
  }
};
export const onSubmitLoginForm = () => async (dispatch, getState) => { };
export const onSubmitForgotPasswordForm = () => async (dispatch, getState) => { };
export const onSubmitChangePasswordForm = () => async (dispatch, getState) => { };
// END FORMS