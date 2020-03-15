const initialState = {
  isAuthenticated: false
};

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}