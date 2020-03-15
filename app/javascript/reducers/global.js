import constants from '../constants/global';

const initialState = {
  currentUser: null,
  isCheckingAuth: true,
  widgets: [],
  widgetSearchTerm: '',
  isFetchingWidgets: false
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
    case constants.FETCH_WIDGETS:
      return spreadState(state, {
        isFetchingWidgets: !state.isFetchingWidgets
      });
    case constants.SET_WIDGETS:
      return spreadState(state, {
        widgets: action.payload,
        isFetchingWidgets: !state.isFetchingWidgets
      });
    case constants.SET_WIDGET_SEARCH_TERM:
      return spreadState(state, {
        widgetSearchTerm: action.payload
      });
    default:
      return state;
  }
}