const initialState = {
  content: [],
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CONTENT":
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default contentReducer;
