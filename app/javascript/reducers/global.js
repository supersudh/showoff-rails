import constants from '../constants/global';

const initialState = {
  currentUser: null,
  isCheckingAuth: true,
};

const spreadState = (state, obj) => {
  const spread = typeof obj === 'function' ? obj() : obj;
  return {
    ...state,
    ...spread
  };
};

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_CURRENT_USER:
      return spreadState(state, {
        currentUser: action.payload,
        isCheckingAuth: false
      });
    case constants.UPDATE_CURRENT_USER:
      return spreadState(state, {
        currentUser: {
          ...state.currentUser,
          user: action.payload
        }
      });
    default:
      return state;
  }
}