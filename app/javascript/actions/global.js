import axios from 'axios';

import { stopSubmit, setSubmitSucceeded } from 'redux-form';
import { replace } from 'connected-react-router'

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
        const Authorization = 'Bearer '.concat(localAuthDetails.access_token);
        const { data: currentUserResponse } = await axios.get(
          `${window.location.origin}/v1/users/me`,
          { headers: { Authorization } }
        );
        dispatch({
          type: constants.SET_CURRENT_USER,
          payload: { token: localAuthDetails, user: currentUserResponse.data.user }
        });
      } else {
        dispatch({ type: constants.SET_CURRENT_USER, payload: null });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const onLogout = () => {
  return async (dispatch, getState) => {
    try {
      const {
        global: {
          currentUser: {
            token,
          }
        }
      } = getState();
      const body = { token: token.access_token };
      const { data: logoutResponse } = await axios.post(`${window.location.origin}/v1/users/logout`, body);
      if (logoutResponse.code !== 0) {
        alert('There was an error logging out');
      } else {
        removeAuthDetails();
        dispatch({
          type: constants.SET_CURRENT_USER,
          payload: null
        });
        dispatch(replace('/login'));
        alert('logged out successfully!');
      }
    } catch (error) {
      console.log('Error in onLogout', error);
    }
  };
}

// FORMS
export const onSubmitForgotPasswordForm = values => async dispatch => {
  try {
    const body = values;
    const { data: response } = await axios.post(`${window.location.origin}/v1/users/reset_password`, body);
    if (response.code !== 0) {
      throw { email: response.message };
    } else {
      dispatch(setSubmitSucceeded('ForgotPasswordForm'));
      dispatch(replace('/login'));
      alert(response.message);
    }
  } catch (error) {
    console.log('Error in onSubmitForgotPasswordForm', error);
    setTimeout(() => dispatch(stopSubmit('ForgotPasswordForm', error)), 100);
  }
};
export const onSubmitRegisterForm = values => async dispatch => {
  try {
    const body = values;
    const { data: response } = await axios.post(`${window.location.origin}/v1/users`, body);
    if (response.code !== 0) {
      throw { email: response.message };
    } else {
      storeAuthDetails(response.data.token);
      dispatch({
        type: constants.SET_CURRENT_USER,
        payload: response.data
      });
      dispatch(setSubmitSucceeded('SignupForm'));
      dispatch(replace('/'));
    }
  } catch (error) {
    console.log('Error in onSubmitRegisterForm', error);
    setTimeout(() => dispatch(stopSubmit('SignupForm', error)), 100);
  }
};
export const onSubmitLoginForm = values => async dispatch => {
  try {
    const body = values;
    const { data: loginResponse } = await axios.post(`${window.location.origin}/v1/users/login`, body);
    if (loginResponse.code !== 0) {
      throw { username: loginResponse.message };
    } else {
      storeAuthDetails(loginResponse.data.token);
      const Authorization = 'Bearer '.concat(loginResponse.data.token.access_token);
      const { data: currentUserResponse } = await axios.get(
        `${window.location.origin}/v1/users/me`,
        { headers: { Authorization } }
      );
      dispatch({
        type: constants.SET_CURRENT_USER,
        payload: { token: loginResponse.data.token, user: currentUserResponse.data.user }
      });
      dispatch(setSubmitSucceeded('LoginForm'));
      dispatch(replace('/'));
    }
  } catch (error) {
    console.log('Error in onSubmitLoginForm', error);
    setTimeout(() => dispatch(stopSubmit('LoginForm', error)), 100);
  }
};

export const onSubmitChangePasswordForm = values => async (dispatch, getState) => {
  try {
    const {
      global: {
        currentUser: {
          token,
          user
        }
      }
    } = getState();
    const body = {
      ...values,
      token: token.access_token
    };
    const { data: changePasswordResponse } = await axios.post(`${window.location.origin}/v1/users/change_password`, body);
    if (changePasswordResponse.code !== 0) {
      throw { current_password: changePasswordResponse.message };
    } else {
      storeAuthDetails(changePasswordResponse.data.token);
      dispatch({
        type: constants.SET_CURRENT_USER,
        payload: { token: changePasswordResponse.data.token, user }
      });
      dispatch(setSubmitSucceeded('ChangePasswordForm'));
      dispatch(replace('/'));
      alert('password changed successfully!');
    }

  } catch (error) {
    console.log('Error in onSubmitChangePasswordForm', error);
    setTimeout(() => dispatch(stopSubmit('ChangePasswordForm', error)), 100);
  }
};

export const onSubmitSettingsForm = values => async (dispatch, getState) => {
  try {
    const {
      global: {
        currentUser: {
          token,
        }
      }
    } = getState();
    const body = {
      ...values,
      token: token.access_token
    };
    const { data: { data: { user } } } = await axios.post(`${window.location.origin}/v1/users/update`, body)
    dispatch({ type: constants.UPDATE_CURRENT_USER, payload: user });
    dispatch(setSubmitSucceeded('SettingsForm'));
    alert('Updated!');
  } catch (error) {
    console.log('Error in onSubmitSettingsForm', error);
    setTimeout(() => dispatch(stopSubmit('SettingsForm', error)), 100);
  }
};
// END FORMS