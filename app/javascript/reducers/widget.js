import constants from '../constants/widgets';

const initialState = {
  widgets: [],
  userWidgets: [],
  widgetSearchTerm: '',
  userWidgetSearchTerm: '',
  isFetchingWidgets: false,
  isFetchingUserWidgets: false,
  isCreateWidgetModalOpen: false,
  isCreatingWidget: false,
  isUpdateWidgetModalOpen: false,
  isUpdatingWidget: false,
  updatingWidget: null
};

const spreadState = (state, obj) => {
  const spread = typeof obj === 'function' ? obj() : obj;
  return {
    ...state,
    ...spread
  };
};

export default function widgetReducer(state = initialState, action) {
  switch (action.type) {
    case constants.TOGGLE_IS_FETCHING_USER_WIDGETS:
      return spreadState(state, {
        isFetchingUserWidgets: !state.isFetchingUserWidgets
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
    case constants.SET_USER_WIDGETS:
      return spreadState(state, {
        userWidgets: action.payload
      });
    case constants.SET_USER_WIDGET_SEARCH_TERM:
      return spreadState(state, {
        userWidgetSearchTerm: action.payload
      });
    case constants.SET_WIDGET_SEARCH_TERM:
      return spreadState(state, {
        widgetSearchTerm: action.payload
      });
    // Modals
    case constants.TOGGLE_IS_CREATE_WIDGET_MODAL_OPEN:
      return spreadState(state, {
        isCreateWidgetModalOpen: !state.isCreateWidgetModalOpen
      });
    case constants.TOGGLE_IS_UPDATE_WIDGET_MODAL_OPEN:
      return spreadState(state, {
        isUpdateWidgetModalOpen: !state.isUpdateWidgetModalOpen,
        updatingWidget: action.payload || null
      });
    case constants.TOGGLE_IS_CREATING_WIDGET:
      return spreadState(state, {
        isCreatingWidget: !state.isCreatingWidget
      });
    case constants.TOGGLE_IS_UPDATING_WIDGET:
      return spreadState(state, {
        isUpdatingWidget: !state.isUpdatingWidget,
      });
    case constants.ON_CREATE_NEW_WIDGET:
      return spreadState(state, {
        widgets: [action.payload].concat(state.widgets),
        userWidgets: [action.payload].concat(state.userWidgets),
      })
    case constants.ON_UPDATE_WIDGET:
      return spreadState(state, () => {
        const updatedWidget = action.payload;
        const index = state.userWidgets.findIndex((t, i) => t.id === updatedWidget.id);
        if (index !== -1) {
          return {
            userWidgets: [
              ...state.userWidgets.slice(0, index),
              updatedWidget,
              ...state.userWidgets.slice(index + 1)
            ]
          };
        }
      });
    case constants.ON_DELETE_WIDGET:
      return spreadState(state, {
        userWidgets: state.userWidgets.filter(t => t.id !== action.payload)
      });
    default:
      return state;
  }
}